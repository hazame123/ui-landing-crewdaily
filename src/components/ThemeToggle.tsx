"use client";

import { useTheme } from "@/hooks/useTheme";
import { Palette, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: "midnight_studio", name: "Midnight Studio", description: "Emerald glow on deep charcoal" },
    { id: "golden_hour", name: "Golden Hour", description: "Warm olive tones on soft beige" },
    { id: "arctic_blue", name: "Arctic Blue", description: "Clean blue tones on crisp white" },
    { id: "sage_professional", name: "Sage Professional", description: "Refined sage and stone palette" },
    { id: "charcoal_pro", name: "Charcoal Pro", description: "Pink accents on premium dark" },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full border transition-all duration-200 flex items-center gap-2"
        style={{
          backgroundColor: 'rgb(var(--background-lighter))',
          borderColor: 'rgb(var(--border-light))',
          color: 'rgb(var(--foreground-muted))'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgb(var(--background-lightest))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgb(var(--background-lighter))';
        }}
        whileTap={{ scale: 0.98 }}
        aria-label="Change color scheme"
      >
        <Palette className="w-5 h-5" />
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 min-w-56 border rounded-xl shadow-xl overflow-hidden"
            style={{ 
              backgroundColor: 'rgb(var(--background-lighter))', 
              borderColor: 'rgb(var(--border-light))' 
            }}
          >
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id as any);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                style={{ 
                  backgroundColor: theme === themeOption.id ? 'rgb(var(--primary) / 0.1)' : 'transparent',
                  color: 'rgb(var(--foreground))'
                }}
                onMouseEnter={(e) => {
                  if (theme !== themeOption.id) {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--background-lightest))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== themeOption.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgb(var(--primary) / 0.1)';
                  }
                }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium" style={{ color: 'rgb(var(--foreground))' }}>
                      {themeOption.name}
                    </div>
                    <div className="text-sm" style={{ color: 'rgb(var(--foreground-muted))' }}>
                      {themeOption.description}
                    </div>
                  </div>
                  {theme === themeOption.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'rgb(var(--primary))' }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}