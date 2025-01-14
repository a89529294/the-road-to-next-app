"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { deleteCookie, getCookie } from "@/actions/cookies";

export function RedirectToast() {
  const inFlight = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    console.log("RedirectToast effect running for path:", pathname);
    const showCookieToast = async () => {
      if (inFlight.current) return;

      inFlight.current = true;
      const message = await getCookie("toast");

      if (message) {
        toast.success(message);
        await deleteCookie("toast");
      }

      inFlight.current = false;
    };

    showCookieToast();
  }, [pathname]); // Re-run effect when pathname changes

  return null;
}
