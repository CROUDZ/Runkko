"use client";

import React from "react";
import { m } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'live';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  children,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  variant = 'primary',
  size = 'md',
  className = '',
  external = true
}) => {
  const baseClasses = "inline-flex items-center gap-3 font-semibold transition-all duration-300 rounded-xl";
  
  const variantClasses = {
    primary: "cta-button-primary shadow-lg hover:shadow-purple-500/25",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600",
    live: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  const externalProps = external ? {
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <m.a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...externalProps}
    >
      {LeftIcon && <LeftIcon className="w-5 h-5" />}
      {children}
      {RightIcon && <RightIcon className="w-4 h-4" />}
    </m.a>
  );
};

export default CTAButton;
