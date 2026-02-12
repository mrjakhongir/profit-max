import { paths } from "@/shared/routes";
import LoaderCenter from "@/shared/ui/custom/loader";
import { supabaseClient } from "@/supabase-client";
import { BottomNavigation } from "@/widgets/bottom-navigation";
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
    return <LoaderCenter />;
  }

  if (!isAuthed) {
    return <Navigate to={paths.login} replace />;
  }

  return (
    <div>
      <Outlet />
      <BottomNavigation />
    </div>
  );
};
