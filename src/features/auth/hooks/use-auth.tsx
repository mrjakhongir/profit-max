import { supabaseClient } from "@/supabase-client";
import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();
  const [session, setSession] = useState<Session | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session ?? undefined);
      setUser(data.session?.user ?? undefined);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? undefined);
      setUser(session?.user ?? undefined);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    navigate("/login");

    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  };

  return { user, session, loading, isAuthenticated: !!user, logout };
}
