import { useEffect } from "react";

export default function ThreeBackground() {
  useEffect(() => {
    const gradient = document.createElement("div");
    gradient.className = "animated-gradient";
    document.body.appendChild(gradient);

    gradient.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #fdf7f3, #a9a7d3ff, #faeee5, #a9a3f9ff);
      background-size: 400% 400%;
      z-index: -1;
      animation: moveGradient 10s ease infinite;
    `;

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes moveGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
