import React, { useState, useRef, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
} from "lucide-react";

export const AiChatDrawer: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    clearChat,
  } = useFinance();

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isSending]);

  if (!isChatOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isSending) return;

    setInput("");
    setIsSending(true);
    try {
      await sendChatMessage(text);
    } finally {
      setIsSending(false);
    }
  };

  const sampleQuestions = [
    "Can I afford a ₹1,00,000 laptop right now?",
    "How can I build my emergency buffer faster?",
    "Should I pay off my loans or invest in SIPs?",
    "Where is the biggest leak in my monthly spending?",
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-black flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-white">Fin AI Strategist</h3>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            </div>
            <p className="text-[10px] text-zinc-400">FinMate Decision Engine Companion</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            title="Clear Chat History"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsChatOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-black">
        {chatMessages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}
            >
              {isAi && (
                <div className="w-6 h-6 rounded bg-zinc-900 text-orange-400 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`max-w-[88%] p-3.5 rounded-lg leading-relaxed whitespace-pre-wrap ${
                  isAi
                    ? "bg-zinc-900 text-zinc-200 border border-zinc-800"
                    : "bg-orange-500 text-black font-semibold"
                }`}
              >
                {msg.text}
              </div>
              {!isAi && (
                <div className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-6 h-6 rounded bg-zinc-900 text-orange-400 border border-zinc-800 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="bg-zinc-900 text-zinc-300 p-3 rounded-lg border border-zinc-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1 text-zinc-400">Fin AI is computing financial impacts...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-950 space-y-1.5">
        <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider">Quick Prompts:</span>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isSending}
              className="text-[11px] px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-800 hover:border-orange-500/50 transition-colors text-left truncate max-w-full"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask Fin AI anything about your money..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 placeholder:text-zinc-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isSending}
            className="p-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-black rounded-lg transition-colors font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
