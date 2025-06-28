"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ChevronDown } from "lucide-react";
import { supabase, type PreSignup } from "@/lib/supabase";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export default function SignupModal({ isOpen, onClose, initialEmail }: SignupModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Set initial email when modal opens
  useEffect(() => {
    if (isOpen && initialEmail) {
      setFormData(prev => ({ ...prev, email: initialEmail }));
    }
  }, [isOpen, initialEmail]);

  const departments = [
    "Production",
    "Directing", 
    "Camera",
    "Lighting/Electrical",
    "Grip",
    "Sound",
    "Art Department",
    "Set Decoration",
    "Props",
    "Construction",
    "Costume/Wardrobe",
    "Hair & Makeup",
    "Special Effects Makeup",
    "Locations",
    "Transportation",
    "Special Effects",
    "Stunts",
    "Visual Effects",
    "Casting",
    "Accounting/Finance",
    "Script/Continuity",
    "Post-Production",
    "Other"
  ];


  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    if (!formData.department) {
      newErrors.department = "Please select your department";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const signupData: PreSignup = {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          department: formData.department,
        };

        const { error } = await supabase
          .from('presignups')
          .insert([signupData])
          .select();

        if (error) {
          // Handle duplicate email error specifically
          if (error.code === '23505') {
            setErrors({ email: "This email is already registered for early access" });
          } else {
            setErrors({ submit: "Something went wrong. Please try again." });
          }
        } else {
          setSubmitSuccess(true);
          // Close modal after success message
          setTimeout(() => {
            onClose();
            setSubmitSuccess(false);
            setFormData({ firstName: "", lastName: "", email: "", department: "" });
          }, 2000);
        }
      } catch {
        setErrors({ submit: "Network error. Please check your connection and try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-md p-8 relative">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-2">Get Early Access <span className="text-emerald-400">Free</span></h2>
                <p className="text-zinc-400 font-light">
                  Sign up before Sep 2025 for your first year <strong>free</strong>
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-zinc-800 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.firstName 
                          ? "border-red-500 focus:border-red-400" 
                          : "border-zinc-700 focus:border-emerald-400"
                      }`}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 font-light"
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-zinc-800 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.lastName 
                          ? "border-red-500 focus:border-red-400" 
                          : "border-zinc-700 focus:border-emerald-400"
                      }`}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 font-light"
                      >
                        {errors.lastName}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-zinc-800 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                      errors.email 
                        ? "border-red-500 focus:border-red-400" 
                        : "border-zinc-700 focus:border-emerald-400"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 font-light"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-zinc-300 mb-2">
                    Primary Department
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full px-4 py-3 pr-6 bg-zinc-800 border rounded-xl text-white focus:outline-none transition-colors text-left flex items-center justify-between ${
                        errors.department 
                          ? "border-red-500 focus:border-red-400" 
                          : "border-zinc-700 focus:border-emerald-400"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={formData.department ? "text-white" : "text-zinc-500"}>
                        {formData.department || "Select your department"}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
                        >
                          {departments.map((dept) => (
                            <button
                              key={dept}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, department: dept });
                                setIsDropdownOpen(false);
                                // Clear error when department is selected
                                if (errors.department) {
                                  setErrors({ ...errors, department: "" });
                                }
                              }}
                              className="w-full px-4 py-3 text-left text-white hover:bg-zinc-700 transition-colors duration-75 first:rounded-t-xl last:rounded-b-xl"
                            >
                              {dept}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.department && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 font-light"
                    >
                      {errors.department}
                    </motion.p>
                  )}
                </div>

                {/* General Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center font-light bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                  >
                    {errors.submit}
                  </motion.div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-emerald-400 text-center font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
                  >
                    🎉 Success! You&apos;re on the early access list.
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                    submitSuccess
                      ? "bg-emerald-600 text-white cursor-not-allowed"
                      : isSubmitting
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:from-emerald-400 hover:to-cyan-400"
                  }`}
                >
                  {submitSuccess ? "✓ Signed Up!" : isSubmitting ? "Signing Up..." : "Get Early Access"}
                </motion.button>

                {/* Terms */}
                <p className="text-xs text-zinc-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </motion.form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}