import { useState } from "react";
import "./styles.css";

type RailItem = {
  id: string;
  label: string;
  glyph: string;
};

const items: RailItem[] = [
  { id: "chat", label: "Chat", glyph: "💬" },
  { id: "tasks", label: "Tarefas", glyph: "✅" },
  { id: "notes", label: "Notas", glyph: "📝" },
  { id: "calendar", label: "Calendário", glyph: "📅" },
  { id: "tools", label: "Tools", glyph: "🧰" },
];

export default function Rail() {
  const [active, setActive] = useState<string>("chat");

  return (
    <div className="railWrap">
      <div className="railLogo" title="Gasp AI">
        G
      </div>

      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className={`railBtn ${active === it.id ? "isActive" : ""}`}
          onClick={() => setActive(it.id)}
          title={it.label}
        >
          {it.glyph}
        </button>
      ))}

      <div className="railSpacer" />

      <button className="railBtn" type="button" title="Ajuda">
        ❔
      </button>
    </div>
  );
}
