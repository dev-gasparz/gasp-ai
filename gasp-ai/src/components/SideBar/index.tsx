import { useMemo, useState } from "react";
import "./styles.css";

type Conversation = {
  id: string;
  title: string;
  updatedAt: string;
  group: "Hoje" | "Ontem" | "Anterior";
};

const seedConversations = (): Conversation[] => [
  {
    id: "1",
    title: "Boas-vindas ao Gasp AI",
    updatedAt: "12:08",
    group: "Hoje",
  },
  {
    id: "2",
    title: "Planejar semana + hábitos",
    updatedAt: "09:41",
    group: "Hoje",
  },
  {
    id: "3",
    title: "Automação de tarefas",
    updatedAt: "Ontem",
    group: "Ontem",
  },
  {
    id: "4",
    title: "Ideias de integração",
    updatedAt: "Dom",
    group: "Anterior",
  },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState<string>("1");
  const [q, setQ] = useState("");
  const conversations = useMemo(seedConversations, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return conversations;
    return conversations.filter((c) => c.title.toLowerCase().includes(term));
  }, [q, conversations]);

  const groups: Array<Conversation["group"]> = ["Hoje", "Ontem", "Anterior"];

  return (
    <div className="sidebarWrap">
      <div className="sidebarHeader">
        <div className="brandText">
          <div className="brandName">Gasp AI</div>
          <div className="brandSub">Ghostly, clean, productive</div>
        </div>
      </div>

      <button className="newChatBtn" type="button">
        + Nova conversa
      </button>

      <input
        className="searchBox"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar conversas…"
      />

      <div className="sectionTitle">Conversas</div>

      <nav className="conversations">
        {groups.map((g) => {
          const list = filtered.filter((c) => c.group === g);
          if (list.length === 0) return null;

          return (
            <div key={g}>
              <div className="groupTitle">{g}</div>
              {list.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`conversationItem ${c.id === activeId ? "isActive" : ""}`}
                  onClick={() => setActiveId(c.id)}
                  title={c.title}
                >
                  <div className="conversationTitle">{c.title}</div>
                  <div className="conversationMeta">{c.updatedAt}</div>
                </button>
              ))}
            </div>
          );
        })}
      </nav>

      <div className="sidebarFooter">
        <button className="sidebarLink" type="button">
          Config
        </button>
        <button className="sidebarLink" type="button">
          Logs
        </button>
      </div>
    </div>
  );
}
