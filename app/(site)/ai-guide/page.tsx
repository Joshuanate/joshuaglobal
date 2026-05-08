"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, BookOpen, ChevronRight, Search, Loader2 } from "lucide-react";

const suggestedQuestions = [
  "What does the Bible say about fear?",
  "What is the meaning of salvation?",
  "How did Jesus teach about forgiveness?",
  "What is the Kingdom of God?",
  "What did Jesus mean by 'love your enemies'?",
  "What does grace actually mean?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIGuidePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (question?: string) => {
    const q = question || input.trim();
    if (!q || isLoading) return;

    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history: messages }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I couldn't process that right now. Please try again or explore the Truth Dictionary for in-depth biblical definitions.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container-editorial py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold">AI Truth Guide</h1>
              <p className="text-xs text-muted-foreground">Scripture-grounded · Context-rich · Source-referenced</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container-editorial py-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-300 dark:border-gold-700 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-gold-500" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3">Ask Anything About the Bible</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              The AI Truth Guide searches across biblical teachings, truth definitions, and scripture
              references to give you grounded, contextual answers.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 w-full max-w-xl">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-gold-300 dark:hover:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-950/20 text-left text-sm text-muted-foreground hover:text-foreground transition-all group"
                >
                  <Search className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-gold-500 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gold-500 text-white rounded-br-sm"
                      : "bg-card border border-border text-muted-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 mt-1 text-sm font-bold">
                    You
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 rounded-2xl bg-card border border-border rounded-bl-sm">
                  <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        <div className="sticky bottom-4">
          <div className="flex gap-3 p-3 rounded-2xl border border-border bg-card shadow-lg shadow-black/5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about any biblical topic, verse, or teaching..."
              className="flex-1 bg-transparent text-sm focus:outline-none px-2 placeholder:text-muted-foreground"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gold-500 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            All answers are scripture-referenced. Explore our{" "}
            <Link href="/truth" className="text-gold-600 dark:text-gold-400 hover:underline">
              Truth Dictionary
            </Link>{" "}
            for deep biblical definitions.
          </p>
        </div>
      </div>
    </div>
  );
}
