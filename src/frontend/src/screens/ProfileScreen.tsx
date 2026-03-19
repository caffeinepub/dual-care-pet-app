import { useState } from "react";
import { CatIllustration } from "../components/illustrations/CatIllustration";
import { DogIllustration } from "../components/illustrations/DogIllustration";
import { useAppContext } from "../context/AppContext";
import type { PetProfile } from "../context/AppContext";

const ENERGY_COLORS: Record<string, string> = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-blue-100 text-blue-600",
};

function WeightChart({
  entries,
}: { entries: { date: string; weight: number }[] }) {
  const last7 = entries.slice(-7);
  if (last7.length < 2) {
    return (
      <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
        Add at least 2 entries to see the chart 📈
      </div>
    );
  }
  const W = 280;
  const H = 120;
  const PAD = 24;
  const weights = last7.map((e) => e.weight);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  const range = maxW - minW || 1;
  const xStep = (W - PAD * 2) / (last7.length - 1);
  const toX = (i: number) => PAD + i * xStep;
  const toY = (w: number) => H - PAD - ((w - minW) / range) * (H - PAD * 2);
  const points = last7.map((e, i) => `${toX(i)},${toY(e.weight)}`).join(" ");
  const area = `M${toX(0)},${H - PAD} ${last7.map((e, i) => `L${toX(i)},${toY(e.weight)}`).join(" ")} L${toX(last7.length - 1)},${H - PAD} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Weight chart"
    >
      <title>Weight over time chart</title>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4CAF50" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chartGrad)" />
      <polyline
        points={points}
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {last7.map((e) => (
        <g key={e.date}>
          <circle
            cx={toX(last7.indexOf(e))}
            cy={toY(e.weight)}
            r="4"
            fill="white"
            stroke="#4CAF50"
            strokeWidth="2"
          />
          <text
            x={toX(last7.indexOf(e))}
            y={H - 4}
            textAnchor="middle"
            fontSize="8"
            fill="#9CA3AF"
          >
            {e.date.slice(5)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ProfileScreen() {
  const {
    petProfile,
    setPetProfile,
    weightLog,
    addWeightEntry,
    vaccinationRecords,
    addVaccinationRecord,
    medicalNotes,
    addMedicalNote,
    reminders,
    updateReminder,
  } = useAppContext();

  const [activeSection, setActiveSection] = useState<
    "weight" | "vaccines" | "notes"
  >("weight");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(petProfile?.name ?? "");
  const [editType, setEditType] = useState<"dog" | "cat">(
    petProfile?.type ?? "dog",
  );
  const [editAge, setEditAge] = useState(petProfile?.age ?? "");
  const [editEnergy, setEditEnergy] = useState<PetProfile["energyLevel"]>(
    petProfile?.energyLevel ?? "Medium",
  );
  const [weightDate, setWeightDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [weightValue, setWeightValue] = useState("");
  const [vacDate, setVacDate] = useState(new Date().toISOString().slice(0, 10));
  const [vacName, setVacName] = useState("");
  const [vacNotes, setVacNotes] = useState("");
  const [noteText, setNoteText] = useState("");

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    setPetProfile({
      name: editName.trim(),
      type: editType,
      age: editAge,
      energyLevel: editEnergy,
    });
    setShowEditModal(false);
  };

  const handleAddWeight = () => {
    if (!weightValue) return;
    addWeightEntry({
      date: weightDate,
      weight: Number.parseFloat(weightValue),
    });
    setWeightValue("");
  };

  const handleAddVaccine = () => {
    if (!vacName.trim()) return;
    addVaccinationRecord({
      date: vacDate,
      vaccine: vacName.trim(),
      notes: vacNotes.trim(),
    });
    setVacName("");
    setVacNotes("");
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addMedicalNote({
      date: new Date().toLocaleDateString(),
      text: noteText.trim(),
    });
    setNoteText("");
  };

  const isOverdue = (r: {
    enabled: boolean;
    time: string;
    lastDone: number | null;
  }) => {
    if (!r.enabled) return false;
    const [h, m] = r.time.split(":").map(Number);
    const now = new Date();
    const today = now.toDateString();
    const reminderTime = new Date();
    reminderTime.setHours(h, m, 0, 0);
    const doneToday = r.lastDone
      ? new Date(r.lastDone).toDateString() === today
      : false;
    return now > reminderTime && !doneToday;
  };

  const handleMarkDone = (id: string) => {
    const r = reminders.find((x) => x.id === id);
    if (r) updateReminder({ ...r, lastDone: Date.now() });
  };

  const exportReport = () => {
    const lines = [
      "===== PET HEALTH REPORT =====",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "--- PET PROFILE ---",
      `Name: ${petProfile?.name ?? "N/A"}`,
      `Type: ${petProfile?.type ?? "N/A"}`,
      `Age: ${petProfile?.age ?? "N/A"} years`,
      `Energy Level: ${petProfile?.energyLevel ?? "N/A"}`,
      "",
      "--- WEIGHT LOG ---",
      ...weightLog.map((w) => `${w.date}: ${w.weight} kg`),
      weightLog.length === 0 ? "No entries." : "",
      "",
      "--- VACCINATION RECORDS ---",
      ...vaccinationRecords.map((v) => `${v.date} | ${v.vaccine} | ${v.notes}`),
      vaccinationRecords.length === 0 ? "No records." : "",
      "",
      "--- MEDICAL NOTES ---",
      ...medicalNotes.map((n) => `${n.date}: ${n.text}`),
      medicalNotes.length === 0 ? "No notes." : "",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${petProfile?.name ?? "pet"}-health-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const REMINDER_META: Record<string, { emoji: string; label: string }> = {
    vaccination: { emoji: "💉", label: "Vaccination" },
    feeding: { emoji: "🍽️", label: "Feeding" },
    medicine: { emoji: "💊", label: "Medicine" },
  };

  return (
    <div className="tab-screen px-4 pb-10">
      <div className="mt-8 bg-card rounded-2xl shadow-card p-5 flex items-center gap-4 mb-4">
        <div className="flex-shrink-0">
          {petProfile?.type === "cat" ? (
            <CatIllustration size={80} />
          ) : (
            <DogIllustration size={80} />
          )}
        </div>
        <div className="flex-1">
          <h2 className="font-poppins font-bold text-xl text-foreground">
            {petProfile?.name ?? "My Pet"}
          </h2>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium capitalize">
              {petProfile?.type ?? "pet"}
            </span>
            <span className="text-xs px-2 py-0.5 bg-secondary/30 text-foreground rounded-full font-medium">
              {petProfile?.age} yrs
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${ENERGY_COLORS[petProfile?.energyLevel ?? "Medium"]}`}
            >
              ⚡ {petProfile?.energyLevel}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditName(petProfile?.name ?? "");
            setEditType(petProfile?.type ?? "dog");
            setEditAge(petProfile?.age ?? "");
            setEditEnergy(petProfile?.energyLevel ?? "Medium");
            setShowEditModal(true);
          }}
          className="px-3 py-2 bg-muted text-muted-foreground rounded-xl text-xs font-semibold"
          data-ocid="profile.edit_button"
        >
          ✏️ Edit
        </button>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-poppins font-semibold text-foreground">
            Health Tracking 📊
          </h3>
          <button
            type="button"
            onClick={exportReport}
            className="text-xs px-3 py-1.5 bg-accent/10 text-accent rounded-xl font-semibold"
            data-ocid="profile.export_button"
          >
            📄 Export
          </button>
        </div>

        <div className="flex gap-1 p-1 bg-muted rounded-xl mb-4">
          {(["weight", "vaccines", "notes"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSection(s)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeSection === s
                  ? "bg-card text-primary shadow-xs"
                  : "text-muted-foreground"
              }`}
              data-ocid={`profile.${s}_tab`}
            >
              {s === "weight"
                ? "⚖️ Weight"
                : s === "vaccines"
                  ? "💉 Vaccines"
                  : "📝 Notes"}
            </button>
          ))}
        </div>

        {activeSection === "weight" && (
          <div>
            <WeightChart entries={weightLog} />
            <div className="flex gap-2 mt-3">
              <input
                type="date"
                value={weightDate}
                onChange={(e) => setWeightDate(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="profile.weight_date_input"
              />
              <input
                type="number"
                placeholder="kg"
                value={weightValue}
                onChange={(e) => setWeightValue(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="profile.weight_input"
              />
              <button
                type="button"
                onClick={handleAddWeight}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold"
                data-ocid="profile.weight_add_button"
              >
                Add
              </button>
            </div>
            {weightLog.length > 0 && (
              <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
                {[...weightLog].reverse().map((w) => (
                  <div
                    key={`${w.date}-${w.weight}`}
                    className="flex justify-between text-xs py-1.5 px-3 bg-muted rounded-lg"
                  >
                    <span className="text-muted-foreground">{w.date}</span>
                    <span className="font-semibold text-foreground">
                      {w.weight} kg
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === "vaccines" && (
          <div>
            <div className="space-y-2 mb-3">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={vacDate}
                  onChange={(e) => setVacDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.vaccine_date_input"
                />
                <input
                  placeholder="Vaccine name"
                  value={vacName}
                  onChange={(e) => setVacName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.vaccine_name_input"
                />
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Notes (optional)"
                  value={vacNotes}
                  onChange={(e) => setVacNotes(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.vaccine_notes_input"
                />
                <button
                  type="button"
                  onClick={handleAddVaccine}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold"
                  data-ocid="profile.vaccine_add_button"
                >
                  Add
                </button>
              </div>
            </div>
            {vaccinationRecords.length === 0 ? (
              <p
                className="text-center text-muted-foreground text-xs py-4"
                data-ocid="profile.vaccines.empty_state"
              >
                No records yet. Add your first! 💉
              </p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[...vaccinationRecords].reverse().map((v) => (
                  <div
                    key={`${v.date}-${v.vaccine}`}
                    className="bg-muted rounded-xl p-3"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold text-xs text-foreground">
                        {v.vaccine}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {v.date}
                      </span>
                    </div>
                    {v.notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {v.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === "notes" && (
          <div>
            <div className="flex gap-2 mb-3">
              <textarea
                placeholder="Add a medical note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={2}
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                data-ocid="profile.note_textarea"
              />
              <button
                type="button"
                onClick={handleAddNote}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold self-start"
                data-ocid="profile.note_add_button"
              >
                Add
              </button>
            </div>
            {medicalNotes.length === 0 ? (
              <p
                className="text-center text-muted-foreground text-xs py-4"
                data-ocid="profile.notes.empty_state"
              >
                No notes yet. 📝
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[...medicalNotes].reverse().map((n) => (
                  <div key={n.id} className="bg-muted rounded-xl p-3">
                    <p className="text-xs text-foreground">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {n.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-card rounded-2xl shadow-card p-4">
        <h3 className="font-poppins font-semibold text-foreground mb-3">
          Reminders ⏰
        </h3>
        <div className="space-y-3">
          {reminders.map((r, i) => {
            const meta = REMINDER_META[r.type];
            const overdue = isOverdue(r);
            return (
              <div
                key={r.id}
                className={`rounded-xl p-3 border ${overdue ? "border-red-300 bg-red-50" : "border-border bg-muted"}`}
                data-ocid={`profile.reminder.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{meta.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">
                        {meta.label}
                      </span>
                      {overdue && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-bold">
                          OVERDUE
                        </span>
                      )}
                    </div>
                    <input
                      type="time"
                      value={r.time}
                      onChange={(e) =>
                        updateReminder({ ...r, time: e.target.value })
                      }
                      className="mt-1 text-xs bg-transparent border-none p-0 text-muted-foreground focus:outline-none"
                      data-ocid={`profile.reminder_time.${i + 1}`}
                    />
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={r.enabled}
                    onClick={() =>
                      updateReminder({ ...r, enabled: !r.enabled })
                    }
                    className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${r.enabled ? "bg-primary" : "bg-border"}`}
                    data-ocid={`profile.reminder_toggle.${i + 1}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${r.enabled ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                </div>
                {r.enabled && (
                  <button
                    type="button"
                    onClick={() => handleMarkDone(r.id)}
                    className="mt-2 w-full py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold"
                    data-ocid={`profile.reminder_done.${i + 1}`}
                  >
                    ✅ Mark as Done
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showEditModal && (
        <div
          className="modal-overlay center"
          data-ocid="profile.edit_modal"
          onClick={() => setShowEditModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowEditModal(false)}
        >
          <div
            className="w-full max-w-[360px] mx-4 bg-card rounded-2xl shadow-float p-5 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <h3 className="font-poppins font-bold text-lg text-foreground mb-4">
              Edit Profile ✏️
            </h3>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="edit-pet-name"
                  className="text-xs font-semibold text-muted-foreground block mb-1"
                >
                  Pet Name
                </label>
                <input
                  id="edit-pet-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.edit_name_input"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Pet Type
                </p>
                <div className="flex gap-2">
                  {(["dog", "cat"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEditType(t)}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize border-2 transition-colors ${
                        editType === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                      data-ocid={`profile.edit_type_${t}_button`}
                    >
                      {t === "dog" ? "🐕 Dog" : "🐱 Cat"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="edit-pet-age"
                  className="text-xs font-semibold text-muted-foreground block mb-1"
                >
                  Age (years)
                </label>
                <input
                  id="edit-pet-age"
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  data-ocid="profile.edit_age_input"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Energy Level
                </p>
                <div className="flex gap-2">
                  {(["High", "Medium", "Low"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setEditEnergy(l)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-colors ${
                        editEnergy === l
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                      data-ocid={`profile.edit_energy_${l.toLowerCase()}_button`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground font-semibold text-sm"
                data-ocid="profile.edit_cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
                data-ocid="profile.edit_save_button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
