import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {

    async function verificarUsuario() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      setLoading(false);

    }

    verificarUsuario();

  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}