import { useCallback, useEffect, useRef, useState } from "react";
import { CatIllustration } from "../components/illustrations/CatIllustration";
import { DogIllustration } from "../components/illustrations/DogIllustration";
import { PawPrint } from "../components/illustrations/PawPrint";
import { useAppContext } from "../context/AppContext";
import type { PetProfile } from "../context/AppContext";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  id: string;
}

type OnboardingStep = 0 | 1 | 3 | 4 | 5;

let obMsgId = 0;
function nextObId() {
  obMsgId += 1;
  return `ob-${obMsgId}`;
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { setPetProfile } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<OnboardingStep>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [petAge, setPetAge] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const addBotMessage = useCallback((text: string, delay: number) => {
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text, id: nextObId() }]);
    }, delay);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    addBotMessage("Hi! Welcome to Dual Care 🐾", 900);
    setTimeout(() => {
      setIsTyping(true);
      addBotMessage("What is your pet's name?", 1900);
    }, 1000);
  }, [addBotMessage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: bottomRef is stable
  useEffect(() => {
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }, [messages, isTyping]);

  const handleNameSubmit = () => {
    if (!inputValue.trim()) return;
    const name = inputValue.trim();
    setPetName(name);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: name, id: nextObId() },
    ]);
    setInputValue("");
    setIsTyping(true);
    addBotMessage(`Lovely name! Is ${name} a dog or a cat? 🐶🐱`, 1200);
    setStep(1);
  };

  const handlePetTypeSelect = (type: "dog" | "cat") => {
    setPetType(type);
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: type === "dog" ? "🐕 Dog" : "🐱 Cat",
        id: nextObId(),
      },
    ]);
    setIsTyping(true);
    addBotMessage(`How old is ${petName}? 🎂`, 1200);
    setStep(3);
  };

  const handleAgeSubmit = () => {
    if (!inputValue.trim()) return;
    const age = inputValue.trim();
    setPetAge(age);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `${age} years old`, id: nextObId() },
    ]);
    setInputValue("");
    setIsTyping(true);
    addBotMessage(`What is ${petName}'s energy level? ⚡`, 1200);
    setStep(4);
  };

  const handleEnergySelect = (level: "High" | "Medium" | "Low") => {
    const profile: PetProfile = {
      name: petName,
      type: petType,
      age: petAge,
      energyLevel: level,
    };
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `${level} energy`, id: nextObId() },
    ]);
    setPetProfile(profile);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Great! We will help take care of ${petName} ❤️`,
          id: nextObId(),
        },
      ]);
      setStep(5);
      setTimeout(onComplete, 1800);
    }, 1200);
  };

  const energyColors: Record<string, string> = {
    High: "bg-red-400",
    Medium: "bg-secondary",
    Low: "bg-blue-400",
  };

  return (
    <div
      className="mobile-container flex flex-col bg-background"
      style={{ minHeight: "100dvh" }}
    >
      <div className="flex flex-col px-5 pt-10 pb-4">
        <div className="flex items-center gap-2">
          <PawPrint size={28} />
          <span className="font-poppins font-bold text-xl text-foreground">
            Dual Care
          </span>
          <span className="text-muted-foreground text-sm ml-auto">Setup</span>
        </div>
        <p className="text-xs mt-1" style={{ color: "#f97316" }}>
          Founder: NIRBHAY MAURYA
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex animate-slide-up ${
              msg.role === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.role === "bot" && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <span className="text-white text-xs">🐾</span>
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "bot"
                  ? "bg-card text-foreground shadow-card rounded-tl-sm"
                  : "bg-primary text-primary-foreground rounded-tr-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-white text-xs">🐾</span>
            </div>
            <div className="bg-card shadow-card px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1.5 items-center h-4">
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground block" />
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground block" />
                <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground block" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-8 pt-2 bg-card border-t border-border">
        {step === 0 && (
          <div className="flex gap-2" data-ocid="onboarding.input">
            <input
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your pet's name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
              data-ocid="onboarding.name_input"
            />
            <button
              type="button"
              onClick={handleNameSubmit}
              className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
              data-ocid="onboarding.name_submit_button"
            >
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => handlePetTypeSelect("dog")}
              className="flex-1 flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border-2 border-border hover:border-primary transition-colors shadow-card"
              data-ocid="onboarding.dog_button"
            >
              <DogIllustration size={64} />
              <span className="font-poppins font-semibold text-foreground">
                Dog 🐕
              </span>
            </button>
            <button
              type="button"
              onClick={() => handlePetTypeSelect("cat")}
              className="flex-1 flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border-2 border-border hover:border-primary transition-colors shadow-card"
              data-ocid="onboarding.cat_button"
            >
              <CatIllustration size={64} />
              <span className="font-poppins font-semibold text-foreground">
                Cat 🐱
              </span>
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex gap-2">
            <input
              type="number"
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Age in years..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAgeSubmit()}
              min="0"
              data-ocid="onboarding.age_input"
            />
            <button
              type="button"
              onClick={handleAgeSubmit}
              className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
              data-ocid="onboarding.age_submit_button"
            >
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="flex gap-2 justify-center">
            {(["High", "Medium", "Low"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleEnergySelect(level)}
                className={`flex-1 py-3 rounded-xl text-white font-semibold text-sm ${energyColors[level]}`}
                data-ocid={`onboarding.energy_${level.toLowerCase()}_button`}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="flex justify-center py-4">
            <div className="flex gap-3 animate-float">
              <DogIllustration size={60} />
              <CatIllustration size={60} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
