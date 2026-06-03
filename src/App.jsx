import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Produto from "./pages/Produto";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/catalogo" element={<Catalogo />} />

      <Route path="/produto/:id" element={<Produto />} />
      <Route path="/produto/:id" element={<Produto />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
          
        }
        
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}