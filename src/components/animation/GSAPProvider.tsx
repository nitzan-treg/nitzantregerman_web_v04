"use client";

import { useEffect } from "react";
import { registerGSAP } from "@/lib/animations";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGSAP();
  }, []);

  return <>{children}</>;
}
