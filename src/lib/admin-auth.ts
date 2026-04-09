"use client";

import { supabase } from "@/integrations/supabase/client";

export async function isCurrentUserAdmin(userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });

  return {
    isAdmin: Boolean(data),
    error,
  };
}

export async function requireAdminSession() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return {
      session: null,
      isAdmin: false,
      error: sessionError,
    };
  }

  const roleResult = await isCurrentUserAdmin(session.user.id);

  return {
    session,
    isAdmin: roleResult.isAdmin,
    error: roleResult.error,
  };
}
