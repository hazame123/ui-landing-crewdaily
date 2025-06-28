"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Users } from "lucide-react";

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

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Setup Production",
      description: "Add departments, invite heads, and create your team structure",
      icon: Building2,
    },
    {
      number: "02", 
      title: "Schedule Shoots",
      description: "Add shoot days and department-specific prep events to the calendar",
      icon: Calendar,
    },
    {
      number: "03",
      title: "Book Your Circle",
      description: "Invite trusted crew to apply for shifts within your network",
      icon: Users,
    },
  ];

  return (
    <section className="py-24 bg-zinc-900 relative z-10">
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
            How CrewDaily Works
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.4 }
              }}
              className="text-center group relative"
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10 p-8">
                <motion.div 
                  className="text-7xl font-bold text-zinc-700 mb-6 group-hover:text-emerald-400 transition-all duration-500"
                  whileInView={{
                    textShadow: "0 0 20px rgba(16,185,129,0.5)"
                  }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {item.number}
                </motion.div>
                
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 text-emerald-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.0, 
                    delay: 0.3 + index * 0.1,
                    type: "spring" as const,
                    bounce: 0.1
                  }}
                  viewport={{ once: true }}
                >
                  <item.icon className="w-12 h-12" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-white mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {item.title}
                </motion.h3>
                
                <motion.p 
                  className="text-zinc-400 text-lg font-light"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}