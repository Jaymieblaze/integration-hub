// components/SearchGrid.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Combo {
  slug: string;
  source: { name: string; color: string; category?: string };
  dest: { name: string; color: string; category?: string };
}

export default function SearchGrid({ combinations }: { combinations: Combo[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    combinations.forEach((combo) => {
      if (combo.source.category) cats.add(combo.source.category);
      if (combo.dest.category) cats.add(combo.dest.category);
    });
    return ["All", ...Array.from(cats).sort()];
  }, [combinations]);

  // Featured integrations (first 3)
  const featured = combinations.slice(0, 3);

  const filtered = combinations.filter((combo) => {
    const search = query.toLowerCase();
    const matchesSearch =
      combo.source.name.toLowerCase().includes(search) ||
      combo.dest.name.toLowerCase().includes(search);
    
    const matchesCategory =
      selectedCategory === "All" ||
      combo.source.category === selectedCategory ||
      combo.dest.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Search Input - Now first for mobile accessibility */}
      <div className="max-w-2xl mx-auto relative px-2 sm:px-0">
        <input
          type="text"
          placeholder="Search for an app (e.g. ChatGPT, Notion, Slack)..."
          className="w-full p-4 pl-12 pr-12 sm:p-5 sm:pl-14 sm:pr-6 rounded-xl md:rounded-2xl border-2 border-slate-200 shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-base md:text-lg text-slate-900 placeholder:text-gray-400 transition-all bg-white/80 backdrop-blur-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg 
          className="w-5 h-5 md:w-6 md:h-6 text-gray-400 absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Featured Section - Only show when no search query */}
      {!query && (
        <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl mx-2 sm:mx-0">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 className="text-xl md:text-2xl font-bold">Featured Integrations</h3>
          </div>
          <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base">Most popular combinations this week</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {featured.map((combo, idx) => (
              <Link
                key={combo.slug}
                href={`/integration/${combo.slug}`}
                className="group block p-4 sm:p-6 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl hover:bg-white/20 transition-all border border-white/20 hover:scale-105 transform duration-300"
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex -space-x-2 md:-space-x-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${combo.source.color} rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold border-3 md:border-4 border-white/30 shadow-lg`}>
                      {combo.source.name[0]}
                    </div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${combo.dest.color} rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold border-3 md:border-4 border-white/30 shadow-lg`}>
                      {combo.dest.name[0]}
                    </div>
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-white/40">#{idx + 1}</span>
                </div>
                <h4 className="font-bold text-white text-base md:text-lg group-hover:translate-x-1 transition-transform">
                  {combo.source.name} + {combo.dest.name}
                </h4>
                <p className="text-xs md:text-sm text-blue-100 mt-1 md:mt-2">Auto-sync data seamlessly →</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-2 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm md:text-base font-medium transition-all transform hover:scale-105 ${
              selectedCategory === cat
                ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center text-slate-600 text-sm md:text-base px-2">
        <span className="font-semibold text-slate-900">{filtered.length}</span> integration{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 sm:px-0">
        {filtered.map((combo, idx) => (
          <Link 
            key={combo.slug} 
            href={`/integration/${combo.slug}`}
            className="group block p-6 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-4">
                  <div className={`w-14 h-14 ${combo.source.color} rounded-full flex items-center justify-center text-white text-base font-bold border-4 border-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {combo.source.name[0]}
                  </div>
                  <div className={`w-14 h-14 ${combo.dest.color} rounded-full flex items-center justify-center text-white text-base font-bold border-4 border-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {combo.dest.name[0]}
                  </div>
                </div>
                
                <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mb-2">
                  {combo.source.name} + {combo.dest.name}
                </h3>
                <p className="text-sm text-slate-500">
                  Connect and automate workflows
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Zero Results State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">No integrations found</h3>
          <p className="text-slate-500 mb-6">
            No matches for "<span className="font-semibold">{query}</span>"{selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}