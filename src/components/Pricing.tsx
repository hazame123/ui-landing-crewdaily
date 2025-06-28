"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

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

export default function Pricing() {
  const plans = [
    {
      name: "Daily Crew",
      price: "£5",
      period: "/month",
      description: "For freelance crew seeking work",
      features: [
        "Browse available shifts",
        "Set your availability",
        "Calendar view of bookings",
        "Apply to trusted networks",
        "Direct messaging"
      ],
      popular: true,
      cta: "Get Early Access",
      note: "Sign up before Sep 2025 for your first year free (Sep 2025 - Sep 2026)"
    },
    {
      name: "Student",
      price: "Free",
      period: "Forever",
      description: "For student film projects",
      features: [
        "Up to 10 crew members",
        "Basic scheduling",
        "Project management",
        "Educational support"
      ],
      popular: false,
      cta: "Sign Up Free",
    },
    {
      name: "Department",
      price: "£250",
      period: "/month",
      description: "Single department crew management",
      features: [
        "Department-specific booking",
        "Up to 10 department users",
        "Crew network access",
        "Advanced scheduling",
        "Priority support"
      ],
      popular: false,
      cta: "Contact Sales",
    },
    {
      name: "Production",
      price: "£900",
      period: "/month",
      description: "Full production crew management",
      features: [
        "All departments included",
        "Unlimited production users", 
        "Cross-department scheduling",
        "Private crew networks",
        "Dedicated account manager",
        "Custom integrations"
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="py-32 bg-zinc-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Simple Pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-400 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Pricing that works for everyone in film & TV
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.4 }
              }}
              className={`relative group ${
                plan.popular ? "lg:scale-105" : ""
              }`}
            >
              {/* Background glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 ${
                  plan.popular 
                    ? "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 opacity-100" 
                    : "bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
                }`}
              />
              
              {/* Card */}
              <div className={`relative bg-zinc-900 rounded-2xl p-8 border transition-colors duration-300 ${
                plan.popular 
                  ? "border-emerald-500/50" 
                  : "border-zinc-800 group-hover:border-zinc-700"
              }`}>
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-sm font-semibold px-4 py-2 rounded-full">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <div className="text-center">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.name}
                  </motion.h3>
                  
                  <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-400 font-light">{plan.period}</span>
                  </motion.div>
                  
                  <motion.p 
                    className="text-zinc-400 font-light mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.description}
                  </motion.p>
                  
                  {plan.note && (
                    <motion.p 
                      className="text-emerald-400 font-semibold text-sm mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {plan.note}
                    </motion.p>
                  )}
                </div>

                <motion.ul 
                  className="space-y-3 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + index * 0.1 + featureIndex * 0.05 
                      }}
                      viewport={{ once: true }}
                    >
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-zinc-300 font-light">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.button
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400"
                      : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-400 font-light">
          </p>
        </motion.div>
      </div>
    </section>
  );
}