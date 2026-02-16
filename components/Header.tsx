"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-base sm:text-xl">IH</span>
            </div>
            <span className="text-base sm:text-xl font-bold text-slate-900">
              Integration<span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Hub</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3 sm:gap-6">
            {!isHome && (
              <Link 
                href="/"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1 sm:gap-2 group text-sm sm:text-base"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Browse All</span>
                <span className="sm:hidden">All</span>
              </Link>
            )}
            
            <a
              href="https://www.make.com/en/register?pc=jaymieblaze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
