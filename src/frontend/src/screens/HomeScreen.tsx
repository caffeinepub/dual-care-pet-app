import { CatIllustration } from "../components/illustrations/CatIllustration";
import { DogIllustration } from "../components/illustrations/DogIllustration";
import { PawPrint } from "../components/illustrations/PawPrint";
import { useAppContext } from "../context/AppContext";

const DAILY_TIPS = [
  {
    emoji: "🐕",
    text: "Exercise your dog for at least 30 minutes daily for optimal health and behavior.",
  },
  {
    emoji: "🐱",
    text: "Cats need mental stimulation — rotate toys weekly to keep them engaged and happy.",
  },
  {
    emoji: "💧",
    text: "Always ensure your pet has access to fresh, clean water throughout the day.",
  },
  {
    emoji: "🦷",
    text: "Brush your pet's teeth 2-3 times a week to prevent dental disease.",
  },
  {
    emoji: "🌿",
    text: "Regular grooming reduces shedding and keeps your pet's coat healthy and shiny.",
  },
  {
    emoji: "🏥",
    text: "Annual vet check-ups help catch health issues early, even if your pet seems fine.",
  },
  {
    emoji: "🎾",
    text: "Playtime strengthens the bond between you and your pet. Aim for 15 min sessions.",
  },
  {
    emoji: "😴",
    text: "Cats sleep 12-16 hours daily. Provide a cozy, quiet spot just for them.",
  },
  {
    emoji: "🧪",
    text: "Keep up with flea, tick, and heartworm prevention year-round for a healthy pet.",
  },
  {
    emoji: "🥩",
    text: "Feed your pet at consistent times each day to support digestive health.",
  },
];

const FEATURE_CARDS = [
  {
    emoji: "🐕",
    label: "Dog Care",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    emoji: "🐱",
    label: "Cat Care",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    emoji: "💉",
    label: "Vaccination",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    emoji: "✅",
    label: "Checklist",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    emoji: "🚨",
    label: "Emergency",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    emoji: "📸",
    label: "Gallery",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
];

const REMINDER_ICONS: Record<string, string> = {
  vaccination: "💉",
  feeding: "🍽️",
  medicine: "💊",
};

export function HomeScreen() {
  const { petProfile, reminders, setActiveTab, setShowPetShop } =
    useAppContext();

  const dayIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % DAILY_TIPS.length;
  const tip = DAILY_TIPS[dayIndex];

  const enabledReminders = reminders.filter((r) => r.enabled).slice(0, 2);

  const handleFeatureClick = (label: string) => {
    if (label === "Gallery") setActiveTab("gallery");
  };

  return (
    <div className="tab-screen px-4 pb-6">
      <div className="pt-10 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-foreground">
            Hello, Pet Lover 🐶🐱
          </h1>
          {petProfile && (
            <p className="text-sm mt-0.5">
              Taking care of{" "}
              <span className="text-primary font-semibold">
                {petProfile.name}
              </span>{" "}
              💚
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <PawPrint size={22} />
        </div>
      </div>

      <div className="flex justify-center py-2 mb-4">
        <div className="animate-float">
          {petProfile?.type === "cat" ? (
            <CatIllustration size={130} />
          ) : (
            <DogIllustration size={130} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {FEATURE_CARDS.map((card, i) => (
          <button
            key={card.label}
            type="button"
            onClick={() => handleFeatureClick(card.label)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border ${card.bg} ${card.border} shadow-card hover:scale-95 active:scale-90 transition-transform`}
            data-ocid={`home.feature_card.${i + 1}`}
          >
            <span className="text-3xl">{card.emoji}</span>
            <span className="font-poppins font-semibold text-xs text-foreground text-center leading-tight">
              {card.label}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl shadow-card p-4 mb-4 border-l-4 border-primary flex gap-3 items-start">
        <span className="text-2xl">{tip.emoji}</span>
        <div>
          <p className="font-poppins font-semibold text-sm text-foreground mb-1">
            Daily Tip 💡
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tip.text}
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-card p-4 mb-4">
        <h3 className="font-poppins font-semibold text-sm text-foreground mb-3">
          Upcoming Reminders ⏰
        </h3>
        {enabledReminders.length === 0 ? (
          <div
            className="text-center py-4"
            data-ocid="home.reminders.empty_state"
          >
            <p className="text-muted-foreground text-sm">
              No reminders set. Add them in your Profile!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {enabledReminders.map((r, i) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-2.5 bg-muted rounded-xl"
                data-ocid={`home.reminder.item.${i + 1}`}
              >
                <span className="text-xl">{REMINDER_ICONS[r.type]}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold capitalize text-foreground">
                    {r.type}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowPetShop(true)}
        className="w-full bg-gradient-to-r from-secondary to-amber-400 rounded-2xl p-4 flex items-center justify-between shadow-card"
        data-ocid="home.pet_shop_button"
      >
        <div>
          <p className="font-poppins font-bold text-foreground">Pet Shop 🛍️</p>
          <p className="text-xs text-foreground/70 mt-0.5">
            Food, toys, grooming &amp; more
          </p>
        </div>
        <span className="text-3xl">🐾</span>
      </button>

      <footer className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
