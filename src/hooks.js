import { useEffect, useState } from "react";

/** True only when the device can comfortably run the WebGL avatar. Otherwise we use the CSS 3D fallback. */
export function useCan3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCpu = (navigator.hardwareConcurrency || 4) < 4;
    let gl = false;
    try { gl = !!document.createElement("canvas").getContext("webgl2"); } catch {}
    setOk(gl && !reduced && !lowCpu);
  }, []);
  return ok;
}
