"use client";

import { useEffect } from "react";

export function MountTracker() {
  useEffect(() => {
    console.log("TicketLayout mounted at:", Date.now());

    return () => {
      console.log("TicketLayout unmounted at:", Date.now());
    };
  }, []);

  return null;
}
