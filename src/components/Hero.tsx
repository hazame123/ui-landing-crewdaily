"use client";

import { motion, MotionValue } from "framer-motion";
import { useState } from "react";
import SignupModal from "./SignupModal";

interface HeroProps {
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}

export default function Hero({ heroY, heroOpacity }: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
            style={{ color: 'rgb(var(--foreground))' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Daily Crew Hiring,{" "}
            </motion.span>
            <motion.span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(to right, rgb(var(--primary-light)), rgb(var(--secondary-light)))' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Simplified
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
            style={{ color: 'rgb(var(--foreground-muted))' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Replace spreadsheets and WhatsApp with streamlined crew management for film & TV productions
          </motion.p>
          
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16,185,129,0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
            style={{
              background: 'linear-gradient(to right, rgb(var(--primary)), rgb(var(--secondary)))',
              color: 'rgb(var(--black))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, rgb(var(--primary-light)), rgb(var(--secondary-light)))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, rgb(var(--primary)), rgb(var(--secondary)))';
            }}
          >
            Get Early Access
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 rounded-full"
        style={{ backgroundColor: 'rgb(var(--primary-light) / 0.15)' }}
        animate={{
          y: [0, -10, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 rounded-full"
        style={{ backgroundColor: 'rgb(var(--secondary-light) / 0.15)' }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-3 h-3 rounded-full"
        style={{ backgroundColor: 'rgb(var(--primary-light) / 0.2)' }}
        animate={{
          y: [0, -8, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
    </section>
      
      <SignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialEmail={undefined}
      />
    </>
  );
}