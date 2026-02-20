import { useMemo, useRef, useState } from "react";
import "./styles.css";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const initialMessages = (): ChatMessage[] => [
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Oi! Eu sou o Gasp. Me diz o que você quer organizar hoje — rotina, tarefas, calendário, e-mails, ou código.",
  },
];

export default function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialMessages(),
  );
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  };

  const send = () => {
    if (!canSend) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Fechado. Eu posso transformar isso em passos e sugerir ações (com confirmação) quando conectarmos o backend.",
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    scrollToBottom();
  };

  return (
    <section className="chatCard">
      <div className="chatList" ref={listRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`msgRow ${m.role === "user" ? "isUser" : "isAssistant"}`}
          >
            <div className="msgBubble">
              <div className="msgRole">
                {m.role === "user" ? "Você" : "Gasp"}
              </div>
              <div className="msgText">{m.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="composer">
        <div className="composerInner">
          <textarea
            className="composerInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem…"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            className="sendBtn"
            type="button"
            onClick={send}
            disabled={!canSend}
          >
            Enviar
          </button>
        </div>
        <div className="composerHint">
          Enter envia • Shift+Enter quebra linha
        </div>
      </div>
    </section>
  );
}
