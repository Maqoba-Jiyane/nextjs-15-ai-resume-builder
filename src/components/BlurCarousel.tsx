"use client";

import { useState } from "react";
import Image from "next/image";

type Logo = {
  src: string;
  alt?: string;
};

type CircularLogosProps = {
  logos: Logo[];
  size?: number;      // diameter of the circle in px
  rotateSpeed?: number; // seconds for one full rotation
};

export default function CircularLogos({
  logos,
  size = 280,
  rotateSpeed = 22,
}: CircularLogosProps) {
  const [isPaused, setIsPaused] = useState(false);

  const radius = size / 2;
  const logoCount = logos.length;

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Rotation wrapper */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: `spin ${rotateSpeed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {logos.map((logo, i) => {
          const angle = (i / logoCount) * 360;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: radius - 26,
                top: radius - 26,
                transform: `rotate(${angle}deg) translate(${radius - 40}px) rotate(-${angle}deg)`,
              }}
            >
              <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-900 ring-1 ring-slate-700 flex items-center justify-center p-1">
                <Image
                  src={logo.src}
                  alt={logo.alt ?? "logo"}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
