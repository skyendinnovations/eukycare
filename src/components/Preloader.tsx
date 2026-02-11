"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and wait for page to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Also check if document is fully loaded
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => setIsLoading(false), 500);
      });
    }

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="relative">
        {/* Logo with pulse animation */}
        <div className="relative w-32 h-32 animate-pulse">
          <Image
            src="/resources/brand_logo.png"
            alt="Euky Care"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Loading spinner ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-4 border-gray-200 border-t-eukyPurple rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-eukyPurple font-medium text-lg animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
}
