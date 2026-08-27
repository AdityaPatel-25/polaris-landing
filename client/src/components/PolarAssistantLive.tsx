/** Explorer Polar Assistant: flexible multi-turn conversation powered by the secure POLARIS server procedure. */
import { useState } from "react";
import { ArrowRight, FileText, Image as ImageIcon, Map, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { AIChatBox } from "@/components/AIChatBox";
import { NorthStarMark } from "@/components/NorthStarMark";
import { trpc } from "@/lib/trpc";

type ConversationMessage = { role: "user" | "assistant"; content: string };

const guidedQuestions = [
  "Why is Antarctic ice loss important for sea-level rise?",
  "Explain the difference between Arctic and Antarctica.",
  "How do satellites measure changes in sea ice?",
  "Help me understand this polar-science topic.",
];

export function PolarAssistantLive() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const chat = trpc.polarAssistant.chat.useMutation({
    onSuccess: ({ answer }) => {
      setMessages(current => [...current, { role: "assistant", content: answer }]);
    },
    onError: () => {
      setMessages(current => [...current, {
        role: "assistant",
        content: "I could not reach the POLARIS response service just now. Please try your question again in a moment.",
      }]);
    },
  });

  const askQuestion = (content: string) => {
    if (!content.trim() || chat.isPending) return;
    const nextMessages: ConversationMessage[] = [
      ...messages,
      { role: "user", content: content.trim() },
    ];
    setMessages(nextMessages);
    chat.mutate({ messages: nextMessages.slice(-8) });
  };

  return <>
    <section className="assistant-hero assistant-hero--live">
      <div><p className="eyebrow"><MessageCircle size={14} /> Contextual science guide</p><h1>Polar<br /><em>Assistant.</em></h1><p>Ask any question. POLARIS responds with clear, evidence-aware guidance and knows when to state uncertainty.</p></div>
      <div className="assistant-orbit"><span /><span /><NorthStarMark /></div>
    </section>
    <section className="assistant-workspace assistant-workspace--live">
      <aside className="assistant-prompts"><p>GUIDED STARTING POINTS</p>{guidedQuestions.map(question => <button key={question} onClick={() => askQuestion(question)} disabled={chat.isPending}>{question}<ArrowRight size={15} /></button>)}<div className="assistant-status"><span>RESPONSE MODE</span><b>{chat.isPending ? "TRACING CONTEXT" : "READY FOR QUESTIONS"}</b></div></aside>
      <AIChatBox className="polar-assistant-chat" messages={messages} onSendMessage={askQuestion} isLoading={chat.isPending} height="540px" placeholder="Ask anything — polar science, research, or a general question…" emptyStateMessage="Ask POLARIS anything." suggestedPrompts={guidedQuestions.slice(0, 3)} />
    </section>
    <section className="assistant-evidence-routes"><p>EXPLORE THE POLARIS RECORD</p><div><button onClick={() => navigate("/user/repository")}><FileText size={17} /><span>Evidence repository<small>Trace reviewed research</small></span><ArrowRight size={16} /></button><button onClick={() => navigate("/user/expeditions")}><Map size={17} /><span>Expedition routes<small>See field context</small></span><ArrowRight size={16} /></button><button onClick={() => navigate("/user/media")}><ImageIcon size={17} /><span>Visual evidence<small>Open the media archive</small></span><ArrowRight size={16} /></button></div></section>
  </>;
}
