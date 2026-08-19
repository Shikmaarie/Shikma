"use client";

import { useEffect } from "react";
import { captureRef } from "@/lib/ref";

/** Records ?ref= on the first page of the visit. Renders nothing. */
export default function RefCapture() {
  useEffect(() => {
    captureRef();
  }, []);

  return null;
}
