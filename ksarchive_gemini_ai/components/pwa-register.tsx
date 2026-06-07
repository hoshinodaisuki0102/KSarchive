"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    let refreshing = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      registration.update().catch(() => undefined);

      const interval = window.setInterval(() => {
        registration.update().catch(() => undefined);
      }, 60 * 1000);

      return () => window.clearInterval(interval);
    }).catch(() => undefined);
  }, []);

  return null;
}
