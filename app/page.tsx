import { getAllCombinations } from "@/lib/combinations";
import SearchGrid from "@/components/SearchGrid";
import { apps } from "@/data/apps";

export default function Home() {
  const combinations = getAllCombinations();
  const totalIntegrations = combinations.length;
  const totalApps = apps.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      
      <div className="relative z-10 px-4 py-8 sm:px-6 md:px-12 md:py-12">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-6 md:mb-8">
          <div className="inline-block mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-600 rounded-full text-xs md:text-sm font-semibold animate-fade-in">
            ✨ Discover Powerful Automation
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight animate-slide-up leading-tight">
            Integration<span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Hub</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-200 px-2">
            Connect your favorite apps and automate your workflow. Save hours every week with seamless integrations.
          </p>
        </div>

        {/* Search & Grid - Now positioned higher */}
        <div className="max-w-7xl mx-auto mb-8 md:mb-12">
          <SearchGrid combinations={combinations} />
        </div>

        {/* Stats - Now below search on mobile, but can be scrolled to */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 animate-slide-up animation-delay-400">
            <div className="group cursor-pointer">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {totalIntegrations}+
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Integrations</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="group cursor-pointer">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {totalApps}+
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Apps</div>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="group cursor-pointer">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">Free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}