"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LightRays from "~/components/ui/Backgrounds/LightRays/LightRays";
import NavHeader from "~/components/ui/Components/NavHeader";
import TextType from "~/components/ui/TextAnimations/TextType/TextType";

function LiquidGlassHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // smaller shift for mobile
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 md:pt-16 px-4 sm:px-6"
      style={{ y, opacity }}
    >
      {/* Background Light Rays */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFD1DD"
          raysSpeed={0.6}
          lightSpread={0.7}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.08}
          distortion={0.03}
          className="w-full h-full"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

      {/* Centered Main Content */}
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        {/* Welcome Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white/90 backdrop-blur-md"
        >
          Make Your Own Music
        </motion.div>

        {/* Main Headline */}
        <div className="mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          <div className="h-[3.5rem] sm:h-[4.5rem] md:h-[5.5rem] lg:h-[6.5rem] flex items-center justify-center">
            <TextType
              text={[
                "Make a smooth jazz track about cats",
                "Make a chill lofi beat about the ocean",
                "Make a motivating song about hard work",
                "Make a funky pop tune inspired by summer vibes",
              ]}
              typingSpeed={85}
              pauseDuration={1000}
              initialDelay={800}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mb-8 sm:mb-12 max-w-xl sm:max-w-2xl text-base sm:text-lg leading-relaxed text-white/70"
        >
          Choose your favorite genre and style. Let AI generate lyrics or use your own words to turn it into a complete song in minutes.
        </motion.p>

        {/* Call-to-Action Input */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto flex w-full max-w-md sm:max-w-xl items-center rounded-full bg-white/5 px-2 py-2 sm:px-4 shadow-lg backdrop-blur-md border border-accent/25"
        >
          <input
            type="text"
            placeholder="Type any idea you have"
            className="flex-1 bg-transparent placeholder-gray-300 px-3 py-2 sm:px-4 text-sm sm:text-base text-white focus:outline-none rounded-full"
          />
          <Link href="/auth/sign-in">
            <button className="ml-2 rounded-full bg-white px-4 sm:px-6 py-2 text-sm sm:text-base text-black font-semibold shadow-md transition hover:bg-gray-100 ">
              Create
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

const Footer = () => {
  const links = [
    { label: "Feedback", href: "https://docs.google.com/forms/d/e/1FAIpQLSc-Qv--TF4DdzZnTc5SWSccE2y8-G8F59vpIjIEqbBRd_AO4Q/viewform?usp=header" },
    { label: "Contact", href: "https://t.me/asselia7" },
  ];

  return (
    <footer className="py-6 px-4 sm:px-10 bg-black/80 text-white/70">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-3 md:gap-0 items-center">
        <p className="text-xs sm:text-sm">Made by Asseli with 🤍</p>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <NavHeader />
      <LiquidGlassHero />
      <Footer />
    </main>
  );
}