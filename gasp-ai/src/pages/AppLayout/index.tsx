import ChatView from "../../components/ChatView";
import Rail from "../../components/Rail";
import Sidebar from "../../components/SideBar";
import Topbar from "../../components/TopBar";

import "./styles.css";

export default function AppLayout() {
  return (
    <div className="appShell">
      <aside className="rail">
        <Rail />
      </aside>

      <aside className="sidebar">
        <Sidebar />
      </aside>

      <section className="main">
        <header className="topbar">
          <Topbar />
        </header>

        <main className="content">
          <div className="centerStage">
            <div className="centerColumn">
              <ChatView />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
