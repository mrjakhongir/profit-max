import { paths } from "@/shared/routes";
import { supabaseClient } from "@/supabase-client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setIsAuthed(!!data.session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Loader2 className="text-primary mx-auto mt-20 animate-spin" size={40} />
    );
  }

  if (!isAuthed) {
    return <Navigate to={paths.login} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
