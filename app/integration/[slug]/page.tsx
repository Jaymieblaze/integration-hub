import { apps } from "@/data/apps";
import { getAllCombinations } from "@/lib/combinations";
import { notFound } from "next/navigation";
import Link from "next/link";
import AppLogo from "@/components/AppLogo";
import type { Metadata } from "next";

// Generate Static Params (Pre-builds all pages)
export async function generateStaticParams() {
  const combos = getAllCombinations();
  return combos.map((combo) => ({
    slug: combo.slug,
  }));
}

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const [sourceId, destId] = slug.split("-to-");
  const sourceApp = apps.find((a) => a.id === sourceId);
  const destApp = apps.find((a) => a.id === destId);

  if (!sourceApp || !destApp) {
    return {
      title: "Integration Not Found",
    };
  }

  const title = `Connect ${sourceApp.name} to ${destApp.name} - Integration Guide 2026`;
  const description = `Learn how to integrate ${sourceApp.name} with ${destApp.name}. Automate workflows between ${sourceApp.category} and ${destApp.category} tools. Step-by-step setup guide with templates.`;
  const url = `https://integrationhub.com/integration/${slug}`;
  
  // Generate a simple OG image URL (you can create actual images later)
  const ogImage = `https://integrationhub.com/api/og?source=${encodeURIComponent(sourceApp.name)}&dest=${encodeURIComponent(destApp.name)}`;

  return {
    title,
    description,
    keywords: [
      `${sourceApp.name} integration`,
      `${destApp.name} integration`,
      `${sourceApp.name} ${destApp.name}`,
      `connect ${sourceApp.name} to ${destApp.name}`,
      `${sourceApp.name} automation`,
      `${destApp.name} automation`,
      sourceApp.category,
      destApp.category,
      "automation",
      "integration",
      "workflow",
      "zapier alternative",
      "make.com",
    ],
    authors: [{ name: "IntegrationHub" }],
    openGraph: {
      title,
      description,
      url,
      siteName: "IntegrationHub",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${sourceApp.name} to ${destApp.name} Integration`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@integrationhub",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// The Page Component
export default async function IntegrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const [sourceId, destId] = slug.split("-to-");
  const sourceApp = apps.find((a) => a.id === sourceId);
  const destApp = apps.find((a) => a.id === destId);

  if (!sourceApp || !destApp) {
    return notFound();
  }

  // JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Connect ${sourceApp.name} to ${destApp.name}`,
    description: `Step-by-step guide to integrate ${sourceApp.name} with ${destApp.name} for workflow automation.`,
    image: `https://integrationhub.com/api/og?source=${encodeURIComponent(sourceApp.name)}&dest=${encodeURIComponent(destApp.name)}`,
    totalTime: "PT15M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    tool: [
      {
        "@type": "HowToTool",
        name: sourceApp.name,
      },
      {
        "@type": "HowToTool",
        name: destApp.name,
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Sign up for automation platform",
        text: "Create a free account on Make.com to connect your apps.",
        url: "https://www.make.com/en/register?pc=jaymieblaze",
      },
      {
        "@type": "HowToStep",
        name: `Connect ${sourceApp.name}`,
        text: `Authenticate your ${sourceApp.name} account.`,
      },
      {
        "@type": "HowToStep",
        name: `Connect ${destApp.name}`,
        text: `Authenticate your ${destApp.name} account.`,
      },
      {
        "@type": "HowToStep",
        name: "Configure automation",
        text: `Set up triggers and actions between ${sourceApp.name} and ${destApp.name}.`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
      
      <div className="relative z-10 flex flex-col items-center py-6 sm:py-8 md:py-12 px-3 sm:px-4">
        <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-white/50 animate-slide-up">
          {/* Header Icons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${sourceApp.color} rounded-xl md:rounded-2xl shadow-xl transform hover:scale-110 transition-transform overflow-hidden`}>
              <AppLogo name={sourceApp.name} logo={sourceApp.logo} size="lg" className={sourceApp.color} />
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="text-xs font-semibold text-blue-600 mt-1 hidden sm:block">Connects to</span>
            </div>
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${destApp.color} rounded-xl md:rounded-2xl shadow-xl transform hover:scale-110 transition-transform overflow-hidden`}>
              <AppLogo name={destApp.name} logo={destApp.logo} size="lg" className={destApp.color} />
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6">
            <span className="px-2.5 py-1 sm:px-3 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
              {sourceApp.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="px-2.5 py-1 sm:px-3 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
              {destApp.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-slate-900 mb-4 md:mb-6 leading-tight px-2">
            Connect {sourceApp.name} to {destApp.name}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 text-center mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            The ultimate guide to automating <strong className="text-blue-600">{sourceApp.name}</strong> and <strong className="text-purple-600">{destApp.name}</strong> in 2026.
          </p>

          {/* Affiliate Link */}
          <div className="flex justify-center mb-8 md:mb-12">
            <a 
              href={`https://www.make.com/en/register?pc=jaymieblaze&source=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-xl md:rounded-2xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
            >
              <span>Get Free Template</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Content Section */}
          <div className="space-y-6 md:space-y-8 text-slate-700">
            {/* Why Integrate */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Why integrate these two?</h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed">
                By connecting {sourceApp.name} (a leading {sourceApp.category} tool) with {destApp.name}, 
                you can save hours of manual work. For example, every time a new event happens in {sourceApp.name}, 
                you can automatically trigger an action in {destApp.name}.
              </p>
            </div>
            
            {/* Use Cases */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                <div className="p-1.5 sm:p-2 bg-purple-500 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Common Use Cases</h2>
              </div>
              <div className="grid gap-3 md:gap-4">
                <div className="flex gap-3 md:gap-4 items-start p-3 sm:p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <p className="text-sm sm:text-base md:text-lg">Sync data from {sourceApp.name} directly into {destApp.name}.</p>
                </div>
                <div className="flex gap-3 md:gap-4 items-start p-3 sm:p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <p className="text-sm sm:text-base md:text-lg">Send notifications to {destApp.name} when updates occur in {sourceApp.name}.</p>
                </div>
                <div className="flex gap-3 md:gap-4 items-start p-3 sm:p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <p className="text-sm sm:text-base md:text-lg">Archive important {sourceApp.name} records into {destApp.name}.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Linking (SEO Boost) */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t-2 border-slate-200">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 md:mb-6 text-slate-900">Explore More Integrations</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                View All Integrations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}