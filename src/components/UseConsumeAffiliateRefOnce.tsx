"use client";

import { useEffect } from "react";

export function UseConsumeAffiliateRefOnce() {
  useEffect(() => {
    fetch("/api/affiliate/consume-ref", {
      method: "POST",
    }).catch(() => {});
  }, []);

  return null;
}
