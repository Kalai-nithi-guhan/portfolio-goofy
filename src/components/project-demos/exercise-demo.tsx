"use client";

import { useEffect, useState } from "react";
import { Activity, Play, Pause, RotateCcw } from "lucide-react";

export function ExerciseDemo() {
  const [reps, setReps] = useState(3);
  const [phase, setPhase] = useState<"down" | "up">("up");
  const [angle, setAngle] = useState(168);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPhase((prevPhase) => {
        if (prevPhase === "up") {
          // Going down into deep squat
          setAngle(82);
          return "down";
        } else {
          // Standing back up, rep counted!
          setAngle(168);
          setReps((r) => r + 1);
          return "up";
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleReset = () => {
    setReps(0);
    setAngle(168);
    setPhase("up");
  };

  // Interpolated coordinates for the SVG stick-figure based on squat phase
  // Up phase: Hip at (100, 120), Knee at (100, 160), Ankle at (100, 200)
  // Down phase: Hip descends to (90, 150), Knee bends out to (125, 165), Ankle at (100, 200)
  const isDown = phase === "down";
  const hipY = isDown ? 150 : 115;
  const hipX = isDown ? 90 : 100;
  const kneeY = isDown ? 165 : 155;
  const kneeX = isDown ? 122 : 102;
  const shoulderY = isDown ? 105 : 75;
  const shoulderX = isDown ? 85 : 98;
  const headY = isDown ? 78 : 48;
  const headX = isDown ? 85 : 98;

  return (
    <div className="rounded-xl border border-[var(--os-border)] bg-[#090A14] overflow-hidden font-mono text-xs">
      {/* Titlebar */}
      <div className="px-3 py-2 bg-[#121324] border-b border-[var(--os-border)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#38BDF8]">
          <Activity className="w-3.5 h-3.5" />
          <span className="font-semibold text-[11px]">mediapipe-pose-stream</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] font-bold border border-[#38BDF8]/30">
            90% ACCURACY
          </span>
          <button
            onClick={() => setIsActive(!isActive)}
            className="p-1 text-[var(--os-text-muted)] hover:text-white rounded"
            title={isActive ? "Pause" : "Play"}
            aria-label="Toggle exercise animation"
          >
            {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1 text-[var(--os-text-muted)] hover:text-white rounded"
            title="Reset counter"
            aria-label="Reset rep counter"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="p-3 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* SVG Pose Visualization with MediaPipe Landmarks */}
        <div className="sm:col-span-7 flex justify-center bg-[#06070D] rounded-lg p-2 border border-[var(--os-border)] relative">
          <svg
            viewBox="0 0 200 230"
            className="w-44 h-48 select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground grid line */}
            <line x1="20" y1="210" x2="180" y2="210" stroke="#23253B" strokeWidth="2" strokeDasharray="4 4" />

            {/* Skeleton Bones (Transform transition) */}
            {/* Spine */}
            <line
              x1={shoulderX}
              y1={shoulderY}
              x2={hipX}
              y2={hipY}
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Femur (Hip to Knee) */}
            <line
              x1={hipX}
              y1={hipY}
              x2={kneeX}
              y2={kneeY}
              stroke="#7CFF6B"
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Tibia (Knee to Ankle) */}
            <line
              x1={kneeX}
              y1={kneeY}
              x2="105"
              y2="208"
              stroke="#7CFF6B"
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Arms (Shoulder to Hands) */}
            <line
              x1={shoulderX}
              y1={shoulderY}
              x2={isDown ? "130" : "110"}
              y2={isDown ? "110" : "110"}
              stroke="#FF5CAA"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-700 ease-in-out"
            />

            {/* MediaPipe Keypoint Landmarks */}
            {/* Head */}
            <circle
              cx={headX}
              cy={headY}
              r="12"
              fill="#131424"
              stroke="#38BDF8"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Shoulder Landmark */}
            <circle
              cx={shoulderX}
              cy={shoulderY}
              r="4.5"
              fill="#38BDF8"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Hip Landmark */}
            <circle
              cx={hipX}
              cy={hipY}
              r="5"
              fill="#7CFF6B"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Knee Landmark */}
            <circle
              cx={kneeX}
              cy={kneeY}
              r="5"
              fill="#7CFF6B"
              className="transition-all duration-700 ease-in-out"
            />
            {/* Ankle Landmark */}
            <circle cx="105" cy="208" r="4.5" fill="#38BDF8" />

            {/* 3-Point Angle Arc label */}
            <text
              x={kneeX + 12}
              y={kneeY + 4}
              fill="#7CFF6B"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {angle}°
            </text>
          </svg>

          {/* Floating Live Tag */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] text-[var(--os-accent)] bg-black/70 px-2 py-0.5 rounded border border-[var(--os-border)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--os-accent)] animate-pulse" />
            LIVE KINEMATICS
          </div>
        </div>

        {/* Rep & Form Telemetry Metrics */}
        <div className="sm:col-span-5 space-y-2">
          {/* Big Rep Counter */}
          <div className="p-3 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] text-center">
            <div className="text-[10px] text-[var(--os-text-dim)] uppercase">Completed Reps</div>
            <div className="text-3xl font-heading font-extrabold text-[var(--os-accent)] my-0.5">
              {reps}
            </div>
            <div className="text-[10px] text-[var(--os-text-muted)]">
              Target: Squats (Lockout Validated)
            </div>
          </div>

          {/* State telemetry */}
          <div className="p-2.5 rounded-lg bg-[var(--os-surface)] border border-[var(--os-border)] space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[var(--os-text-dim)]">Form State:</span>
              <span className={`font-bold ${isDown ? "text-[var(--os-secondary)]" : "text-[var(--os-accent)]"}`}>
                {isDown ? "FLEXION (82°)" : "EXTENSION (168°)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--os-text-dim)]">Threshold:</span>
              <span className="text-[var(--os-text)]">&lt; 90° Required</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--os-text-dim)]">Noise Filter:</span>
              <span className="text-[var(--os-accent)]">Active (Low-pass)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
