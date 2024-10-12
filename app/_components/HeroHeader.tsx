import React from "react";

export default function HeroHeader({ children }: { children: string }) {
  return (
    <h1 className="text-4xl vsm:text-5xl sm:text-6xl mb-10">{children}</h1>
  );
}
