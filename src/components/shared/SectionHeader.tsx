"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  primaryIcon: LucideIcon;
  secondaryIcon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  accent?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  primaryIcon: PrimaryIcon,
  secondaryIcon: SecondaryIcon,
  title,
  subtitle,
  description,
  accent
}) => {
  return (
    <div className="text-center mb-20">
      {/* Icônes d'en-tête unifiées */}
      <div className="section-header-icons">
        <div className="icon-circle-primary">
          <PrimaryIcon className="w-6 h-6 text-white" />
        </div>
        <div className="icon-divider"></div>
        <div className="icon-circle-secondary">
          <SecondaryIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      {accent && (
        <div className="flex items-center gap-2 justify-center mb-6">
          <span className="gradient-text-secondary font-semibold">
            {accent}
          </span>
        </div>
      )}

      <h2 className="section-title">
        {title}
        {subtitle && (
          <span className="block gradient-text-primary">
            {subtitle}
          </span>
        )}
      </h2>

      <p className="section-subtitle">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
