"use client";

import Image from "next/image";
import { useState } from "react";

interface AppLogoProps {
  name: string;
  logo: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
};

export default function AppLogo({ name, logo, size = "md", className = "" }: AppLogoProps) {
  const [imageError, setImageError] = useState(false);
  const sizeClass = sizeMap[size];

  // Use Simple Icons CDN
  const logoUrl = `https://cdn.simpleicons.org/${logo}/white`;

  if (imageError) {
    // Fallback to first letter if image fails
    return (
      <div className={`${sizeClass} ${className} flex items-center justify-center text-white font-bold rounded-lg`}>
        {name[0]}
      </div>
    );
  }

  return (
    <div className={`${sizeClass} ${className} flex items-center justify-center p-2`}>
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        width={size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 80}
        height={size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 80}
        className="w-full h-full object-contain"
        onError={() => setImageError(true)}
        unoptimized // Since we're using external CDN
      />
    </div>
  );
}
