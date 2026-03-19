import { useAppContext } from "../context/AppContext";
import type { TabType } from "../context/AppContext";

const TABS: { id: TabType; emoji: string; label: string }[] = [
  { id: "home", emoji: "🏠", label: "Home" },
  { id: "gallery", emoji: "🖼", label: "Gallery" },
  { id: "chat", emoji: "🤖", label: "Chat" },
  { id: "profile", emoji: "👤", label: "Profile" },
];

export function BottomNav() {
  const { activeTab, setActiveTab, setShowAddPost } = useAppContext();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40">
      <div className="bg-card border-t border-border px-2 pb-safe">
        <div className="flex items-end justify-around py-2 relative">
          {TABS.slice(0, 2).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
              data-ocid={`nav.${tab.id}_link`}
            >
              <span className="text-xl">{tab.emoji}</span>
              <span
                className={`text-xs font-medium ${activeTab === tab.id ? "text-primary font-semibold" : ""}`}
              >
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 w-5 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}

          <div className="flex flex-col items-center -mt-5">
            <button
              type="button"
              onClick={() => setShowAddPost(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-float flex items-center justify-center text-white text-2xl font-bold transition-transform active:scale-90"
              aria-label="Add post"
              data-ocid="nav.add_post_button"
            >
              +
            </button>
            <span className="text-xs text-muted-foreground mt-1 font-medium">
              Post
            </span>
          </div>

          {TABS.slice(2).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
              data-ocid={`nav.${tab.id}_link`}
            >
              <span className="text-xl">{tab.emoji}</span>
              <span
                className={`text-xs font-medium ${activeTab === tab.id ? "text-primary font-semibold" : ""}`}
              >
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 w-5 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
