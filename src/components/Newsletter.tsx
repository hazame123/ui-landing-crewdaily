"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SignupModal from "./SignupModal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
    <section className="py-32 relative z-10 overflow-hidden" style={{ backgroundColor: 'rgb(var(--background))' }}>
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom right, rgb(var(--primary) / 0.2), transparent, rgb(var(--secondary) / 0.2))' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: 'rgb(var(--foreground))' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
Join the Early Access List
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-12 font-light"
            style={{ color: 'rgb(var(--foreground-muted))' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
Sign up before September 2025 and get your Daily Crew membership free for a full year
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit} 
            noValidate
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border rounded-full focus:outline-none transition-colors"
              style={{
                backgroundColor: 'rgb(var(--background-lighter))',
                borderColor: 'rgb(var(--border-light))',
                color: 'rgb(var(--foreground))',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgb(var(--accent))';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgb(var(--border-light))';
              }}
              whileFocus={{ 
                scale: 1.01,
                borderColor: "#10b981"
              }}
            />
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(16,185,129,0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg"
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
          </motion.form>
        </motion.div>
      </div>
    </section>
      
      <SignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialEmail={isValidEmail(email) ? email : undefined}
      />
    </>
  );
}