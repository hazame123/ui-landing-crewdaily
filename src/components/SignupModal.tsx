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
            className="fixed inset-0 backdrop-blur-sm z-50"
            style={{ backgroundColor: 'rgb(var(--black) / 0.8)' }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="rounded-2xl border w-full max-w-md p-8 relative" style={{ backgroundColor: 'rgb(var(--background-light))', borderColor: 'rgb(var(--border))' }}>
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 transition-colors"
                style={{ color: 'rgb(var(--foreground-muted))' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--foreground))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(var(--foreground-muted))';
                }}
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
                <h2 className="text-3xl font-bold mb-2" style={{ color: 'rgb(var(--foreground))' }}>Get Early Access <span style={{ color: 'rgb(var(--accent))' }}>Free</span></h2>
                <p className="font-light" style={{ color: 'rgb(var(--foreground-muted))' }}>
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
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--foreground-light))' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'rgb(var(--background-lighter))',
                        borderColor: errors.firstName ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))',
                        color: 'rgb(var(--foreground))'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = errors.firstName ? 'rgb(var(--error))' : 'rgb(var(--accent))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.firstName ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))';
                      }}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm mt-1 font-light"
                        style={{ color: 'rgb(var(--error))' }}
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--foreground-light))' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'rgb(var(--background-lighter))',
                        borderColor: errors.lastName ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))',
                        color: 'rgb(var(--foreground))'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = errors.lastName ? 'rgb(var(--error))' : 'rgb(var(--accent))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.lastName ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))';
                      }}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm mt-1 font-light"
                        style={{ color: 'rgb(var(--error))' }}
                      >
                        {errors.lastName}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--foreground-light))' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'rgb(var(--background-lighter))',
                      borderColor: errors.email ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))',
                      color: 'rgb(var(--foreground))'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = errors.email ? 'rgb(var(--error))' : 'rgb(var(--accent))';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.email ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))';
                    }}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm mt-1 font-light"
                      style={{ color: 'rgb(var(--error))' }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--foreground-light))' }}>
                    Primary Department
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 pr-6 border rounded-xl focus:outline-none transition-colors text-left flex items-center justify-between"
                      style={{
                        backgroundColor: 'rgb(var(--background-lighter))',
                        borderColor: errors.department ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))',
                        color: 'rgb(var(--foreground))'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = errors.department ? 'rgb(var(--error))' : 'rgb(var(--accent))';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.department ? 'rgb(var(--error-dark))' : 'rgb(var(--border-light))';
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span style={{ color: formData.department ? 'rgb(var(--foreground))' : 'rgb(var(--foreground-muted))' }}>
                        {formData.department || "Select your department"}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5" style={{ color: 'rgb(var(--foreground-muted))' }} />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-1 w-full border rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
                          style={{ backgroundColor: 'rgb(var(--background-lighter))', borderColor: 'rgb(var(--border-light))' }}
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
                              className="w-full px-4 py-3 text-left transition-colors duration-75 first:rounded-t-xl last:rounded-b-xl"
                              style={{ color: 'rgb(var(--foreground))' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgb(var(--background-lightest))';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
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
                      className="text-sm mt-1 font-light"
                      style={{ color: 'rgb(var(--error))' }}
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
                    className="text-sm text-center font-light border rounded-xl p-3"
                    style={{
                      color: 'rgb(var(--error))',
                      backgroundColor: 'rgb(var(--error) / 0.1)',
                      borderColor: 'rgb(var(--error) / 0.2)'
                    }}
                  >
                    {errors.submit}
                  </motion.div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center font-semibold border rounded-xl p-4"
                    style={{
                      color: 'rgb(var(--success))',
                      backgroundColor: 'rgb(var(--success) / 0.1)',
                      borderColor: 'rgb(var(--success) / 0.2)'
                    }}
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
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
                  style={submitSuccess ? {
                    backgroundColor: 'rgb(var(--primary-dark))',
                    color: 'rgb(var(--foreground))',
                    cursor: 'not-allowed'
                  } : isSubmitting ? {
                    backgroundColor: 'rgb(var(--background-lightest))',
                    color: 'rgb(var(--foreground-muted))',
                    cursor: 'not-allowed'
                  } : {
                    background: 'linear-gradient(to right, rgb(var(--primary)), rgb(var(--secondary)))',
                    color: 'rgb(var(--black))'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && !submitSuccess) {
                      e.currentTarget.style.background = 'linear-gradient(to right, rgb(var(--primary-light)), rgb(var(--secondary-light)))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting && !submitSuccess) {
                      e.currentTarget.style.background = 'linear-gradient(to right, rgb(var(--primary)), rgb(var(--secondary)))';
                    }
                  }}
                >
                  {submitSuccess ? "✓ Signed Up!" : isSubmitting ? "Signing Up..." : "Get Early Access"}
                </motion.button>

                {/* Terms */}
                <p className="text-xs text-center" style={{ color: 'rgb(var(--foreground-subtle))' }}>
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