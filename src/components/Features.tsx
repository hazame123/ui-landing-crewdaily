"use client";

import { motion } from "framer-motion";
import { Calendar, Zap, Shield, Gauge } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      duration: 1.2,
      bounce: 0.1
    }
  }
};

export default function Features() {
  const features = [
    {
      title: "Smart Scheduling",
      description: "Intelligent crew matching and availability tracking",
      icon: Calendar,
    },
    {
      title: "Real-time Updates",
      description: "Instant notifications and seamless communication",
      icon: Zap,
    },
    {
      title: "Secure & Compliant",
      description: "Industry-standard security with role-based access",
      icon: Shield,
    },
    {
      title: "Analytics & Reports",
      description: "Deep insights into your production workflows",
      icon: Gauge,
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-y border-zinc-800 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Built for Production
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                x: 5,
                transition: { duration: 0.4 }
              }}
              className="group relative"
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.3 }
                }}
              />
              
              <div className="relative z-10 p-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.0,
                    delay: index * 0.1,
                    type: "spring" as const,
                    bounce: 0.1
                  }}
                  viewport={{ once: true }}
                >
                  <feature.icon className="w-12 h-12 text-emerald-400 mb-6" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-zinc-400 text-lg font-light leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}