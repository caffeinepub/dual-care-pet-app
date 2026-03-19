import { useEffect, useRef, useState } from "react";
import { BotAvatar } from "../components/illustrations/BotAvatar";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  timestamp: number;
  id: string;
}

const SUGGESTIONS = [
  "Why isn't my dog eating?",
  "Kitten care tips",
  "Vaccination schedule",
  "Cat vomiting help",
  "Best pet diet",
];

function getBotResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (
    m.includes("not eating") ||
    m.includes("won't eat") ||
    m.includes("no appetite")
  ) {
    return "If your dog isn't eating, it could be due to stress, illness, or a dietary change. Try offering a different food or a warm broth. If it persists more than 2 days, please consult your vet. 🐕";
  }
  if (m.includes("kitten")) {
    return "Kittens need frequent small meals (3-4x/day), a warm safe space, gentle socialization, and a vet check at 8 weeks. Keep them indoors until fully vaccinated! 🐱";
  }
  if (
    m.includes("vaccination") ||
    m.includes("vaccine") ||
    m.includes("shots")
  ) {
    return "Puppies need vaccines at 6-8 weeks: DHPP, then boosters at 12 and 16 weeks. Rabies at 12-16 weeks. Annual boosters after that. Always consult your vet! 💉";
  }
  if (m.includes("vomit") || m.includes("throwing up")) {
    return "Occasional vomiting can be normal, but watch for frequency, blood, or lethargy. Withhold food for 2-4 hours, offer small water sips. If vomiting continues, see your vet immediately. 🏥";
  }
  if (m.includes("food") || m.includes("diet") || m.includes("feed")) {
    return "A balanced diet is key! Dogs do well with quality kibble or fresh food with protein + veggies. Cats need high-protein diets — avoid too many carbs. Always check labels and portion sizes! 🍗";
  }
  return "Great question! For the best advice on your pet's health, I recommend consulting with a licensed vet. In the meantime, make sure your pet has fresh water, regular exercise, and lots of love! 🐾";
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const h = d.getHours() % 12 || 12;
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${h}:${m} ${ampm}`;
}

let msgId = 0;
function nextId() {
  msgId += 1;
  return `msg-${msgId}`;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi! I'm your Pet Doctor 🐾 Ask me anything about your dog or cat!",
      timestamp: Date.now(),
      id: nextId(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: bottomRef is a stable ref
  useEffect(() => {
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      role: "user",
      text: text.trim(),
      timestamp: Date.now(),
      id: nextId(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(
      () => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: getBotResponse(text),
            timestamp: Date.now(),
            id: nextId(),
          },
        ]);
      },
      1200 + Math.random() * 400,
    );
  };

  return (
    <div className="tab-screen flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-10 pb-4 bg-card border-b border-border">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <BotAvatar size={32} />
        </div>
        <div>
          <h1 className="font-poppins font-bold text-lg text-foreground">
            Pet Doctor 🩺
          </h1>
          <p className="text-xs text-primary">Always here to help</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"} animate-slide-up`}
          >
            {msg.role === "bot" && (
              <div className="mr-2 flex-shrink-0">
                <BotAvatar size={32} />
              </div>
            )}
            <div className="max-w-[78%]">
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "bot"
                    ? "bg-green-50 text-foreground rounded-tl-sm border border-green-100"
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                }`}
              >
                {msg.text}
              </div>
              <p
                className={`text-xs text-muted-foreground mt-1 ${msg.role === "bot" ? "text-left" : "text-right"}`}
              >
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="mr-2 flex-shrink-0">
              <BotAvatar size={32} />
            </div>
            <div className="bg-green-50 border border-green-100 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1.5 items-center h-4">
                <span className="typing-dot w-2 h-2 rounded-full bg-primary block" />
                <span className="typing-dot w-2 h-2 rounded-full bg-primary block" />
                <span className="typing-dot w-2 h-2 rounded-full bg-primary block" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-2 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="flex-shrink-0 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
              data-ocid="chat.suggestion_chip"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 bg-card border-t border-border">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ask your pet question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
            data-ocid="chat.input"
          />
          <button
            type="button"
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center disabled:opacity-50 transition-opacity"
            data-ocid="chat.send_button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <title>Send</title>
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
