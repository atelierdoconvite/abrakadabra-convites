import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Produto from "./pages/Produto";
import DetalheConvite from "./pages/DetalheConvite";
import ProtectedRoute from "./components/ProtectedRoute";
import Pedidos from "./pages/Pedidos";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/catalogo" element={<Catalogo />} />

      <Route
        path="/convite/:id"
        element={<DetalheConvite />}
      />

      <Route
        path="/produto/:id"
        element={<Produto />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
  path="/pedidos"
  element={
    <ProtectedRoute>
      <Pedidos />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}