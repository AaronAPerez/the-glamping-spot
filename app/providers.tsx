
"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";


/**
 * Application providers wrapper
 * Wraps the entire application with necessary providers
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}