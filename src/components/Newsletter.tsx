"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="py-32 bg-zinc-950 relative z-10 overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-cyan-950/20"
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
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-zinc-400 mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join the waitlist for early access
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit} 
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
              className="flex-1 px-6 py-4 bg-zinc-800 border border-zinc-700 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
              required
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
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black rounded-full font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-lg"
            >
              Join Waitlist
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}