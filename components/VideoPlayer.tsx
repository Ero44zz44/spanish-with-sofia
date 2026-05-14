"use client";

import { useState, useRef, useEffect } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type VideoSource = "youtube" | "vimeo" | "mp4" | null;

function detectType(src: string): VideoSource {
  if (!src) return null;
  if (src.includes("youtube.com") || src.includes("youtu.be")) return "youtube";
  if (src.includes("vimeo.com")) return "vimeo";
  return "mp4";
}

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return m?.[1] ?? "";
}

function getVimeoId(url: string) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m?.[1] ?? "";
}

interface VideoPlayerProps {
  src: string | null;
  poster: string;
  /** If true, plays inline without lightbox */
  inline?: boolean;
  aspectRatio?: "16/9" | "4/3" | "3/4";
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  inline = false,
  aspectRatio = "16/9",
  className = "",
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const type = src ? detectType(src) : null;

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  function handlePlay() {
    if (!src) return;
    if (inline && type === "mp4") {
      setPlaying(true);
      videoRef.current?.play();
    } else {
      setModalOpen(true);
    }
  }

  const paddingMap = { "16/9": "56.25%", "4/3": "75%", "3/4": "133.33%" };

  return (
    <>
      {/* Poster + play button */}
      <div
        className={className}
        style={{ position: "relative", width: "100%", paddingBottom: paddingMap[aspectRatio], borderRadius: "inherit", overflow: "hidden", background: "#1A0E08" }}
      >
        {/* Poster image */}
        {(!playing || !inline) && (
          <Image
            src={poster}
            alt="Video thumbnail"
            fill
            unoptimized={poster.includes("/placeholders/")}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 640px"
          />
        )}

        {/* Inline mp4 */}
        {inline && playing && type === "mp4" && (
          <video
            ref={videoRef}
            src={src!}
            controls
            autoPlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {/* Play button overlay */}
        {(!playing || !inline) && (
          <button
            onClick={handlePlay}
            aria-label="Play video"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(26,14,8,0.25)",
              border: "none",
              cursor: src ? "pointer" : "default",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { if (src) (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,14,8,0.45)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,14,8,0.25)"; }}
          >
            {src && (
              <div style={{
                width: "4.5rem",
                height: "4.5rem",
                borderRadius: "50%",
                background: "var(--color-white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                transition: "transform 0.2s",
              }}>
                <Play size={22} fill="var(--color-primary)" color="var(--color-primary)" style={{ marginLeft: "3px" }} />
              </div>
            )}
          </button>
        )}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ width: "100%", maxWidth: "900px", position: "relative" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "-2.5rem",
                  right: 0,
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.9rem",
                  opacity: 0.8,
                }}
              >
                <X size={18} /> Close
              </button>

              <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: "0.75rem", overflow: "hidden", background: "#000" }}>
                {type === "youtube" && (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(src!)}?autoplay=1&rel=0`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                )}
                {type === "vimeo" && (
                  <iframe
                    src={`https://player.vimeo.com/video/${getVimeoId(src!)}?autoplay=1`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                )}
                {type === "mp4" && (
                  <video
                    src={src!}
                    controls
                    autoPlay
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
