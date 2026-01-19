// components/SearchGrid.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface Combo {
  slug: string;
  source: { name: string; color: string };
  dest: { name: string; color: string };
}

export default function SearchGrid({ combinations }: { combinations: Combo[] }) {
  const [query, setQuery] = useState("");

  const filtered = combinations.filter((combo) => {
    const search = query.toLowerCase();
    return (
      combo.source.name.toLowerCase().includes(search) ||
      combo.dest.name.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-12 relative">
        <input
          type="text"
          placeholder="Search for an app (e.g. ChatGPT, Notion)..."
          // ADDED: 'text-slate-900' for dark text, 'placeholder:text-gray-400' for subtle placeholder
          className="w-full p-4 pl-12 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg text-slate-900 placeholder:text-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg 
          className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((combo) => (
          <Link 
            key={combo.slug} 
            href={`/integration/${combo.slug}`}
            className="group block p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                <div className={`w-10 h-10 ${combo.source.color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                  {combo.source.name[0]}
                </div>
                <div className={`w-10 h-10 ${combo.dest.color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                  {combo.dest.name[0]}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                  {combo.source.name} + {combo.dest.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Zero Results State */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No integrations found for "{query}".
        </div>
      )}
    </div>
  );
}