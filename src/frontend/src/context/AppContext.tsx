import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface PetProfile {
  name: string;
  type: "dog" | "cat";
  age: string;
  energyLevel: "High" | "Medium" | "Low";
}

export interface PetComment {
  id: string;
  text: string;
  timestamp: number;
}

export interface GalleryPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  likedInSession: boolean;
  comments: PetComment[];
}

export interface Reminder {
  id: string;
  type: "vaccination" | "feeding" | "medicine";
  time: string;
  enabled: boolean;
  lastDone: number | null;
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface VaccinationRecord {
  date: string;
  vaccine: string;
  notes: string;
}

export interface MedicalNote {
  id: string;
  date: string;
  text: string;
}

export type TabType = "home" | "gallery" | "chat" | "profile";

const SAMPLE_POSTS: GalleryPost[] = [
  {
    id: "p1",
    imageUrl: "https://picsum.photos/seed/pet1/400/400",
    caption: "Max loves sunny mornings 🌞",
    likes: 24,
    likedInSession: false,
    comments: [{ id: "c1", text: "So cute!", timestamp: Date.now() - 3600000 }],
  },
  {
    id: "p2",
    imageUrl: "https://picsum.photos/seed/pet2/400/400",
    caption: "Nap time is the best time 😴",
    likes: 18,
    likedInSession: false,
    comments: [],
  },
  {
    id: "p3",
    imageUrl: "https://picsum.photos/seed/pet3/400/400",
    caption: "Ready for walkies! 🐾",
    likes: 31,
    likedInSession: false,
    comments: [
      { id: "c2", text: "Adorable!", timestamp: Date.now() - 7200000 },
    ],
  },
  {
    id: "p4",
    imageUrl: "https://picsum.photos/seed/pet4/400/400",
    caption: "My favorite toy 🎾",
    likes: 15,
    likedInSession: false,
    comments: [],
  },
  {
    id: "p5",
    imageUrl: "https://picsum.photos/seed/pet5/400/400",
    caption: "First day at the park 🌳",
    likes: 42,
    likedInSession: false,
    comments: [
      { id: "c3", text: "What a beauty!", timestamp: Date.now() - 10800000 },
    ],
  },
  {
    id: "p6",
    imageUrl: "https://picsum.photos/seed/pet6/400/400",
    caption: "Saturday vibes 🐶🐱",
    likes: 29,
    likedInSession: false,
    comments: [],
  },
];

const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: "r1",
    type: "vaccination",
    time: "09:00",
    enabled: true,
    lastDone: null,
  },
  { id: "r2", type: "feeding", time: "07:30", enabled: true, lastDone: null },
  { id: "r3", type: "medicine", time: "20:00", enabled: false, lastDone: null },
];

interface AppContextType {
  petProfile: PetProfile | null;
  setPetProfile: (profile: PetProfile) => void;
  galleryPosts: GalleryPost[];
  addGalleryPost: (
    post: Omit<GalleryPost, "id" | "likes" | "likedInSession" | "comments">,
  ) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  reminders: Reminder[];
  updateReminder: (reminder: Reminder) => void;
  weightLog: WeightEntry[];
  addWeightEntry: (entry: WeightEntry) => void;
  vaccinationRecords: VaccinationRecord[];
  addVaccinationRecord: (record: VaccinationRecord) => void;
  medicalNotes: MedicalNote[];
  addMedicalNote: (note: Omit<MedicalNote, "id">) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  showAddPost: boolean;
  setShowAddPost: (show: boolean) => void;
  showPetShop: boolean;
  setShowPetShop: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [petProfile, setPetProfileState] = useState<PetProfile | null>(() =>
    loadFromStorage("dualcare_profile", null),
  );
  const [galleryPosts, setGalleryPosts] = useState<GalleryPost[]>(SAMPLE_POSTS);
  const [reminders, setReminders] = useState<Reminder[]>(() =>
    loadFromStorage("dualcare_reminders", DEFAULT_REMINDERS),
  );
  const [weightLog, setWeightLog] = useState<WeightEntry[]>(() =>
    loadFromStorage("dualcare_weight", []),
  );
  const [vaccinationRecords, setVaccinationRecords] = useState<
    VaccinationRecord[]
  >(() => loadFromStorage("dualcare_vaccines", []));
  const [medicalNotes, setMedicalNotes] = useState<MedicalNote[]>(() =>
    loadFromStorage("dualcare_notes", []),
  );
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [showAddPost, setShowAddPost] = useState(false);
  const [showPetShop, setShowPetShop] = useState(false);

  useEffect(() => {
    localStorage.setItem("dualcare_profile", JSON.stringify(petProfile));
  }, [petProfile]);
  useEffect(() => {
    localStorage.setItem("dualcare_reminders", JSON.stringify(reminders));
  }, [reminders]);
  useEffect(() => {
    localStorage.setItem("dualcare_weight", JSON.stringify(weightLog));
  }, [weightLog]);
  useEffect(() => {
    localStorage.setItem(
      "dualcare_vaccines",
      JSON.stringify(vaccinationRecords),
    );
  }, [vaccinationRecords]);
  useEffect(() => {
    localStorage.setItem("dualcare_notes", JSON.stringify(medicalNotes));
  }, [medicalNotes]);

  const setPetProfile = useCallback((profile: PetProfile) => {
    setPetProfileState(profile);
  }, []);

  const addGalleryPost = useCallback(
    (
      post: Omit<GalleryPost, "id" | "likes" | "likedInSession" | "comments">,
    ) => {
      setGalleryPosts((prev) => [
        {
          ...post,
          id: `p${Date.now()}`,
          likes: 0,
          likedInSession: false,
          comments: [],
        },
        ...prev,
      ]);
    },
    [],
  );

  const toggleLike = useCallback((postId: string) => {
    setGalleryPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: p.likedInSession ? p.likes - 1 : p.likes + 1,
              likedInSession: !p.likedInSession,
            }
          : p,
      ),
    );
  }, []);

  const addComment = useCallback((postId: string, text: string) => {
    setGalleryPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `c${Date.now()}`, text, timestamp: Date.now() },
              ],
            }
          : p,
      ),
    );
  }, []);

  const updateReminder = useCallback((reminder: Reminder) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminder.id ? reminder : r)),
    );
  }, []);

  const addWeightEntry = useCallback((entry: WeightEntry) => {
    setWeightLog((prev) => [...prev, entry]);
  }, []);

  const addVaccinationRecord = useCallback((record: VaccinationRecord) => {
    setVaccinationRecords((prev) => [...prev, record]);
  }, []);

  const addMedicalNote = useCallback((note: Omit<MedicalNote, "id">) => {
    setMedicalNotes((prev) => [...prev, { ...note, id: `n${Date.now()}` }]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        petProfile,
        setPetProfile,
        galleryPosts,
        addGalleryPost,
        toggleLike,
        addComment,
        reminders,
        updateReminder,
        weightLog,
        addWeightEntry,
        vaccinationRecords,
        addVaccinationRecord,
        medicalNotes,
        addMedicalNote,
        activeTab,
        setActiveTab,
        showAddPost,
        setShowAddPost,
        showPetShop,
        setShowPetShop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
