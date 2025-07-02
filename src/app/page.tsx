"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 40,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <SEOHead />
      <div ref={containerRef} className="min-h-screen relative" style={{ backgroundColor: 'rgb(var(--background))' }}>
        {/* Animated Background */}
        <motion.div className="fixed inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, rgb(var(--background-light) / 0.3), rgb(var(--primary) / 0.1), rgb(var(--background)))` }}></div>
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, rgb(var(--primary) / 0.1), transparent 50%)` }}></div>
        </motion.div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
          style={{ 
            scaleX: smoothProgress,
            background: `linear-gradient(to right, rgb(var(--primary-light)), rgb(var(--secondary-light)))`
          }}
        />

        <ThemeToggle />
        <Hero heroY={heroY} heroOpacity={heroOpacity} />
        <HowItWorks />
        <Features />
        <SocialProof />
        <Pricing />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
