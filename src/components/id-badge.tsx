"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IdBadgeProps {
  name: string;
  title?: string;
  photoSrc: string;
  photoAlt: string;
  employeeId?: string;
  size?: "sm" | "md";
}

export function IdBadge({
  name,
  title = "AI/ML ENGINEER (LOADING...)",
  photoSrc,
  photoAlt,
  employeeId = "KNG-2027",
  size = "md",
}: IdBadgeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Pendulum physics damping animation
  useEffect(() => {
    let currentAngle = 0;
    let velocity = 0;
    const damping = 0.92;
    const stiffness = 0.08;

    // Initial gentle swing
    velocity = 1.8;

    function tick() {
      if (!isDragging) {
        velocity += -stiffness * currentAngle;
        velocity *= damping;
        currentAngle += velocity;
        setAngle(currentAngle);
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartAngle.current = angle;
    lastXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX.current;
    velocityRef.current = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    setAngle(dragStartAngle.current + dx * 0.3);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const isSmall = size === "sm";
  const photoSize = isSmall ? "w-20 h-20" : "w-28 h-28";
  const photoWH = isSmall ? 80 : 112;
  const badgeW = isSmall ? "w-36" : "w-48";

  return (
    <div className="flex flex-col items-center select-none" style={{ perspective: "400px" }}>
      {/* Lanyard string */}
      <div
        className="flex flex-col items-center"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "50% 0%",
          willChange: "transform",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        ref={badgeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Lanyard rope */}
        <svg
          width={isSmall ? 80 : 100}
          height={isSmall ? 40 : 48}
          viewBox={isSmall ? "0 0 80 40" : "0 0 100 48"}
          className="mb-0"
        >
          <path
            d={isSmall
              ? "M40 0 Q20 20 10 40 M40 0 Q60 20 70 40"
              : "M50 0 Q25 24 12 48 M50 0 Q75 24 88 48"
            }
            stroke="var(--os-secondary)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Clip ring */}
          <rect
            x={isSmall ? "36" : "46"}
            y="0"
            width="8"
            height="5"
            rx="2"
            fill="var(--os-border-bright)"
          />
        </svg>

        {/* Badge card */}
        <div
          className={`${badgeW} rounded-2xl border-2 border-[var(--os-border-bright)] bg-[#111222] shadow-2xl overflow-hidden relative`}
        >
          {/* Top accent strip */}
          <div
            className="h-3 w-full"
            style={{
              background: "linear-gradient(90deg, var(--os-accent) 0%, var(--os-secondary) 100%)",
            }}
          />

          {/* Badge body */}
          <div className="px-3 pt-3 pb-3 flex flex-col items-center gap-2">
            {/* Photo */}
            <div
              className={`${photoSize} rounded-xl overflow-hidden border-2 border-[var(--os-accent)]/50 relative bg-[#0A0A12]`}
            >
              <Image
                src={photoSrc}
                alt={photoAlt}
                width={photoWH}
                height={photoWH}
                priority
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
              {/* Ink overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,11,18,0.4) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Name */}
            <div className="text-center">
              <p
                className={`font-heading font-bold text-[var(--os-text)] leading-tight ${isSmall ? "text-[11px]" : "text-sm"}`}
              >
                {name}
              </p>
              <p
                className={`font-mono text-[var(--os-accent)] uppercase tracking-wide ${isSmall ? "text-[8px]" : "text-[10px]"} mt-0.5`}
              >
                {title}
              </p>
            </div>

            {/* SVG barcode */}
            <svg
              viewBox="0 0 100 20"
              className={`w-full ${isSmall ? "h-4" : "h-5"}`}
              aria-hidden="true"
            >
              {Array.from({ length: 32 }, (_, i) => {
                const x = i * 3.1;
                const h = [1, 0.6, 1, 0.8, 1, 0.65, 1, 0.7][i % 8];
                return (
                  <rect
                    key={i}
                    x={x}
                    y={20 * (1 - h)}
                    width={i % 4 === 0 ? 2 : 1}
                    height={20 * h}
                    fill={
                      i % 3 === 0
                        ? "var(--os-accent)"
                        : "var(--os-text-dim)"
                    }
                    opacity={i % 5 === 0 ? 1 : 0.6}
                  />
                );
              })}
            </svg>

            {/* ID line */}
            <p
              className={`font-mono text-[var(--os-text-dim)] ${isSmall ? "text-[8px]" : "text-[9px]"}`}
            >
              ID: {employeeId}
            </p>
          </div>

          {/* Bottom strip */}
          <div className="h-1.5 w-full bg-[var(--os-border)]" />
        </div>
      </div>
    </div>
  );
}
