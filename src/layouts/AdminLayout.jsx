import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, background: "#111", color: "#fff", padding: 20 }}>
        <h3>Admin</h3>

        <nav>
          <Link to="/admin">Dashboard</Link>
        </nav>
      </aside>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}