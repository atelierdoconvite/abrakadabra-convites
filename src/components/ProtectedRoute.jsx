import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {

    async function verificarLogin() {

      const { data } = await supabase.auth.getSession();

      setSession(data.session);

      setLoading(false);

    }

    verificarLogin();

  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;

}