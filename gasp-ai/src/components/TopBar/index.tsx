import "./styles.css";

type User = {
  name: string;
  tag: string;
};

const user: User = {
  name: "Gaspar",
  tag: "Plus",
};

export default function Topbar() {
  return (
    <div className="topbarWrap">
      <div className="topbarLeft">
        <div className="pageTitle">Gasp AI</div>
        <div className="pageHint">
          Assistente pessoal com automações e memória.
        </div>
      </div>

      <div className="topbarRight">
        <div className="pill">Online</div>

        <div className="userCard">
          <div className="avatar" aria-hidden="true">
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="userInfo">
            <div className="userName">{user.name}</div>
            <div className="userMeta">{user.tag}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
