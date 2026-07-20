import { Outlet } from "react-router-dom";

function AuteurLayout() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar Admin à venir */}
      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AuteurLayout;