import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { AddPostModal } from "./components/AddPostModal";
import { BottomNav } from "./components/BottomNav";
import { PetShopModal } from "./components/PetShopModal";
import { AppProvider, useAppContext } from "./context/AppContext";
import { ChatScreen } from "./screens/ChatScreen";
import { GalleryScreen } from "./screens/GalleryScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { Onboarding } from "./screens/Onboarding";
import { ProfileScreen } from "./screens/ProfileScreen";

function MainApp() {
  const { petProfile, activeTab, showAddPost, showPetShop } = useAppContext();
  const [onboardingDone, setOnboardingDone] = useState(!!petProfile);

  if (!onboardingDone) {
    return <Onboarding onComplete={() => setOnboardingDone(true)} />;
  }

  return (
    <div className="mobile-container">
      <main>
        <div className={activeTab === "home" ? "block" : "hidden"}>
          <HomeScreen />
        </div>
        <div className={activeTab === "gallery" ? "block" : "hidden"}>
          <GalleryScreen />
        </div>
        <div className={activeTab === "chat" ? "block" : "hidden"}>
          <ChatScreen />
        </div>
        <div className={activeTab === "profile" ? "block" : "hidden"}>
          <ProfileScreen />
        </div>
      </main>

      <BottomNav />

      {showAddPost && <AddPostModal />}
      {showPetShop && <PetShopModal />}

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
