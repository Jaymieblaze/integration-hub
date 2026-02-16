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

  // Helper function to generate specific use cases based on app categories
  const getSpecificUseCases = (source: typeof sourceApp, dest: typeof destApp) => {
    const useCaseMap: Record<string, Record<string, string[]>> = {
      "AI": {
        "Communication": [
          `Automatically send ${source.name} AI-generated summaries to ${dest.name} channels when analysis completes`,
          `Create ${dest.name} threads with ${source.name} chatbot responses for team review and collaboration`,
          `Route ${source.name} AI conversation insights to specific ${dest.name} team members based on topics`
        ],
        "Project Management": [
          `Generate project briefs in ${dest.name} using ${source.name} AI based on client intake forms`,
          `Auto-create ${dest.name} tasks from ${source.name} meeting transcripts and action items`,
          `Update ${dest.name} project status with ${source.name} AI-generated progress reports`
        ],
        "CRM": [
          `Enrich ${dest.name} lead profiles with ${source.name} AI-generated company research and insights`,
          `Score leads in ${dest.name} using ${source.name} sentiment analysis from email conversations`,
          `Auto-populate ${dest.name} meeting notes with ${source.name} AI summaries from sales calls`
        ],
        "Document": [
          `Generate detailed ${dest.name} documents from ${source.name} AI briefs and outlines`,
          `Translate ${dest.name} content automatically using ${source.name} AI language models`,
          `Create ${dest.name} knowledge base articles from ${source.name} AI Q&A sessions`
        ],
        "default": [
          `Process data through ${source.name} AI and send results to ${dest.name} for further action`,
          `Trigger ${source.name} AI workflows when specific events occur in ${dest.name}`,
          `Enrich ${dest.name} data with ${source.name} AI-generated insights and recommendations`
        ]
      },
      "Communication": {
        "Project Management": [
          `Create ${dest.name} tasks automatically when specific keywords appear in ${source.name} messages`,
          `Send daily ${dest.name} project updates to ${source.name} team channels at scheduled times`,
          `Move ${dest.name} tasks to "In Progress" when team members message status updates in ${source.name}`
        ],
        "CRM": [
          `Log ${source.name} client conversations automatically as activities in ${dest.name} contacts`,
          `Send ${source.name} notifications when ${dest.name} deals move to new pipeline stages`,
          `Create ${dest.name} leads from ${source.name} channel mentions and tagged messages`
        ],
        "Document": [
          `Save important ${source.name} files and attachments automatically to ${dest.name} folders`,
          `Send ${source.name} notifications when ${dest.name} documents are updated or shared`,
          `Create ${dest.name} documents from ${source.name} message threads and conversations`
        ],
        "default": [
          `Forward ${source.name} messages to ${dest.name} based on keywords or channel activity`,
          `Send ${source.name} alerts when important events happen in ${dest.name}`,
          `Archive ${source.name} conversations in ${dest.name} for compliance and record-keeping`
        ]
      },
      "Project Management": {
        "CRM": [
          `Create ${dest.name} deals automatically when ${source.name} projects reach specific milestones`,
          `Sync ${source.name} task assignments to ${dest.name} contact activities for client visibility`,
          `Update ${dest.name} deal values when ${source.name} project budgets or scope changes`
        ],
        "Document": [
          `Generate ${dest.name} project documentation when ${source.name} tasks are completed`,
          `Attach ${dest.name} files automatically to ${source.name} task comments and descriptions`,
          `Create ${source.name} tasks from ${dest.name} document review comments and suggestions`
        ],
        "Communication": [
          `Post ${source.name} project updates to ${dest.name} channels when deadlines approach`,
          `Send ${dest.name} notifications to team members when ${source.name} tasks are assigned`,
          `Create ${source.name} tasks from ${dest.name} pinned messages and important threads`
        ],
        "default": [
          `Sync ${source.name} project data with ${dest.name} to maintain a single source of truth`,
          `Trigger ${dest.name} workflows when ${source.name} project status changes`,
          `Export ${source.name} completed tasks to ${dest.name} for reporting and analytics`
        ]
      },
      "CRM": {
        "Communication": [
          `Send ${dest.name} welcome messages when new contacts are added to ${source.name}`,
          `Alert ${dest.name} sales channels when ${source.name} deals reach high-value thresholds`,
          `Post ${source.name} daily pipeline reports to ${dest.name} team channels automatically`
        ],
        "Document": [
          `Generate ${dest.name} proposals and quotes using ${source.name} deal information`,
          `Attach signed ${dest.name} contracts to ${source.name} deal records automatically`,
          `Create ${dest.name} onboarding documents when ${source.name} deals are marked as won`
        ],
        "Project Management": [
          `Create ${dest.name} onboarding projects when ${source.name} deals close successfully`,
          `Sync ${source.name} contact activities with ${dest.name} task comments for visibility`,
          `Update ${source.name} deal stages when ${dest.name} project milestones are completed`
        ],
        "default": [
          `Sync ${source.name} customer data with ${dest.name} to prevent data silos`,
          `Trigger ${dest.name} actions when ${source.name} contact properties change`,
          `Export ${source.name} reports to ${dest.name} for analysis and visualization`
        ]
      },
      "Document": {
        "Communication": [
          `Send ${dest.name} notifications when ${source.name} documents are shared with team members`,
          `Post ${source.name} document links to ${dest.name} channels when files are updated`,
          `Alert ${dest.name} team when ${source.name} document comments require attention`
        ],
        "Project Management": [
          `Create ${dest.name} tasks when ${source.name} documents receive review comments`,
          `Attach ${source.name} files to ${dest.name} tasks automatically based on project names`,
          `Update ${dest.name} task status when ${source.name} document approvals are completed`
        ],
        "CRM": [
          `Attach ${source.name} proposals to ${dest.name} deal records automatically by filename`,
          `Create ${dest.name} contacts from ${source.name} document shared with external emails`,
          `Log ${source.name} document views as ${dest.name} contact activities for engagement tracking`
        ],
        "default": [
          `Sync ${source.name} files to ${dest.name} for backup and collaboration`,
          `Trigger ${dest.name} workflows when ${source.name} documents are created or modified`,
          `Archive ${source.name} documents in ${dest.name} based on tags or categories`
        ]
      }
    };

    const sourceCategory = source.category;
    const destCategory = dest.category;
    
    const cases = useCaseMap[sourceCategory]?.[destCategory] || 
                  useCaseMap[sourceCategory]?.["default"] || 
                  useCaseMap["default"]?.["default"] || [];
    
    return cases;
  };

  const specificUseCases = getSpecificUseCases(sourceApp, destApp);

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
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 text-center mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            The ultimate guide to automating <strong className="text-blue-600">{sourceApp.name}</strong> and <strong className="text-purple-600">{destApp.name}</strong> in 2026.
          </p>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 md:mb-10 max-w-2xl mx-auto">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 text-center border border-green-200">
              <div className="text-xl sm:text-2xl font-bold text-green-600">15 min</div>
              <div className="text-xs sm:text-sm text-green-700 font-medium mt-1">Setup Time</div>
            </div>
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 text-center border border-blue-200">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">Easy</div>
              <div className="text-xs sm:text-sm text-blue-700 font-medium mt-1">Difficulty</div>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 text-center border border-purple-200">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">Free</div>
              <div className="text-xs sm:text-sm text-purple-700 font-medium mt-1">Cost</div>
            </div>
          </div>

          {/* Affiliate Link */}
          <div className="flex justify-center mb-10 md:mb-12">
            <a 
              href={`https://www.make.com/en/register?pc=jaymieblaze&source=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-xl md:rounded-2xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
            >
              <span>Start Free Integration</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Content Section */}
          <div className="space-y-8 md:space-y-10 text-slate-700">
            {/* Prerequisites */}
            <div className="bg-amber-50 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-amber-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-5">
                <div className="p-1.5 sm:p-2 bg-amber-500 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Prerequisites</h2>
              </div>
              <p className="text-sm sm:text-base mb-4 text-slate-700">Before you begin, make sure you have:</p>
              <div className="space-y-2.5">
                <div className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">An active <strong>{sourceApp.name}</strong> account with admin or integration permissions</span>
                </div>
                <div className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">An active <strong>{destApp.name}</strong> account with write access</span>
                </div>
                <div className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">A free <strong>Make.com</strong> account (sign up link above)</span>
                </div>
                <div className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">API keys or authentication tokens (we&apos;ll guide you through this)</span>
                </div>
                <div className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base">15 minutes of uninterrupted time to complete the setup</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-5 md:mb-6">
                <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Step-by-Step Setup Guide</h2>
              </div>

              <div className="space-y-5 md:space-y-6">
                {/* Step 1 */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5 sm:p-6 hover:border-blue-300 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">1</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Create Your Make.com Account</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        Visit <a href={`https://www.make.com/en/register?pc=jaymieblaze&source=${slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Make.com&apos;s registration page</a> and sign up for a free account. 
                        No credit card required to start. Verify your email address to activate your account.
                      </p>
                      <div className="bg-slate-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-slate-600 border border-slate-200">
                        <strong className="text-slate-900">💡 Pro Tip:</strong> Use your work email for better organization and team collaboration features.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5 sm:p-6 hover:border-blue-300 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">2</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Create a New Scenario</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        Once logged in, click the <strong>&quot;Create a new scenario&quot;</strong> button in your Make.com dashboard. 
                        A scenario is Make.com&apos;s term for an automated workflow.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
                        <p className="text-xs sm:text-sm text-blue-900 font-medium mb-2">📸 Visual Reference:</p>
                        <div className="bg-white rounded border-2 border-dashed border-blue-300 p-8 text-center text-slate-400 text-sm">
                          [Screenshot: Make.com dashboard with &quot;Create new scenario&quot; button highlighted]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5 sm:p-6 hover:border-blue-300 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">3</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Connect {sourceApp.name} as Trigger</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        Click the <strong>+</strong> button to add your first module. Search for <strong>{sourceApp.name}</strong> and select it. 
                        Choose a trigger event (e.g., &quot;Watch New Records&quot;, &quot;Watch Updates&quot;, or &quot;On New Event&quot;).
                      </p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-blue-600 font-bold shrink-0">→</span>
                          <span className="text-slate-600">Click <strong>&quot;Add&quot;</strong> next to the connection field to authenticate</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-blue-600 font-bold shrink-0">→</span>
                          <span className="text-slate-600">Follow the OAuth flow to grant Make.com access to {sourceApp.name}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-blue-600 font-bold shrink-0">→</span>
                          <span className="text-slate-600">Select which data or events you want to monitor</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs sm:text-sm text-blue-900 font-medium mb-2">📸 Visual Reference:</p>
                        <div className="bg-white rounded border-2 border-dashed border-blue-300 p-8 text-center text-slate-400 text-sm">
                          [Screenshot: {sourceApp.name} trigger module configuration with connection dialog]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5 sm:p-6 hover:border-blue-300 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">4</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Add {destApp.name} as Action</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        Click the <strong>+</strong> button after your {sourceApp.name} module. Search for <strong>{destApp.name}</strong> and select it.
                        Choose an action (e.g., &quot;Create Record&quot;, &quot;Update Item&quot;, or &quot;Send Message&quot;).
                      </p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-purple-600 font-bold shrink-0">→</span>
                          <span className="text-slate-600">Connect your {destApp.name} account using the same authentication process</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-purple-600 font-bold shrink-0">→</span>
                          <span className="text-slate-600">Map fields from {sourceApp.name} to {destApp.name} by clicking the field inputs</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-purple-600 font-bold shrink-0">→</span>
                          <span className="text-slate-600">You&apos;ll see available data from {sourceApp.name} in a dropdown menu</span>
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <p className="text-xs sm:text-sm text-purple-900 font-medium mb-2">📸 Visual Reference:</p>
                        <div className="bg-white rounded border-2 border-dashed border-purple-300 p-8 text-center text-slate-400 text-sm">
                          [Screenshot: {destApp.name} action module with field mapping interface]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5 sm:p-6 hover:border-blue-300 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">5</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Map Data Between Apps</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        This is where the magic happens! Click on each field in your {destApp.name} module to map data from {sourceApp.name}.
                        Make.com will show you all available fields from the previous step.
                      </p>
                      <div className="bg-slate-50 rounded-lg p-3 sm:p-4 mb-3 border border-slate-200">
                        <p className="text-xs sm:text-sm text-slate-700 mb-2"><strong>Common field mappings:</strong></p>
                        <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0"></span>
                            <span>Name/Title fields → Name/Subject in destination</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-400 rounded-full shrink-0"></span>
                            <span>Description/Content → Body/Notes in destination</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-400 rounded-full shrink-0"></span>
                            <span>Timestamps → Created Date or Updated Date</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full shrink-0"></span>
                            <span>User/Owner → Assignee or Contact fields</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="bg-white rounded-xl border-2 border-slate-200 p-5 sm:p-6 hover:border-blue-300 transition-colors">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">6</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Test Your Integration</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        Before going live, always test! Click <strong>&quot;Run once&quot;</strong> at the bottom of the scenario builder.
                        Make.com will execute your workflow with real data.
                      </p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-green-600 font-bold shrink-0">✓</span>
                          <span className="text-slate-600">Check that data appears correctly in {destApp.name}</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-green-600 font-bold shrink-0">✓</span>
                          <span className="text-slate-600">Verify all field mappings are accurate</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs sm:text-sm">
                          <span className="text-green-600 font-bold shrink-0">✓</span>
                          <span className="text-slate-600">Look for any error messages in the execution log</span>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                        <p className="text-xs sm:text-sm text-green-900 font-medium mb-2">📸 Visual Reference:</p>
                        <div className="bg-white rounded border-2 border-dashed border-green-300 p-8 text-center text-slate-400 text-sm">
                          [Screenshot: Successful test execution with green checkmarks on modules]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 p-5 sm:p-6">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl">7</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Activate & Monitor</h3>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
                        Once testing is successful, toggle the <strong>&quot;Scheduling&quot;</strong> switch to <strong>ON</strong>.
                        Your integration is now live and will run automatically!
                      </p>
                      <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-300">
                        <p className="text-xs sm:text-sm font-semibold text-green-900 mb-2">🎉 Congratulations!</p>
                        <p className="text-xs sm:text-sm text-slate-700">
                          Your {sourceApp.name} to {destApp.name} integration is now active. Monitor the execution history tab in Make.com to see real-time activity and catch any issues early.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Use Cases */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-5">
                <div className="p-1.5 sm:p-2 bg-purple-500 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Real-World Use Cases</h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 mb-4">
                Here are specific, actionable ways teams are using this {sourceApp.name} + {destApp.name} integration:
              </p>
              <div className="grid gap-3 md:gap-4">
                {specificUseCases.slice(0, 3).map((useCase, index) => {
                  const colors = [
                    { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300' },
                    { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300' },
                    { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-300' }
                  ];
                  const color = colors[index];
                  
                  return (
                    <div key={index} className={`flex gap-3 md:gap-4 items-start p-4 sm:p-5 bg-white rounded-xl border-2 ${color.border} hover:shadow-md transition-all`}>
                      <div className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 ${color.bg} ${color.text} rounded-full flex items-center justify-center font-bold text-sm sm:text-base`}>
                        {index + 1}
                      </div>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{useCase}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tips & Best Practices */}
            <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 border border-indigo-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-5">
                <div className="p-1.5 sm:p-2 bg-indigo-500 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pro Tips & Best Practices</h2>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-lg shrink-0">💡</span>
                  <div>
                    <strong className="text-slate-900 text-sm sm:text-base">Start with one workflow:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">Don&apos;t try to automate everything at once. Pick your most time-consuming manual task first.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg shrink-0">🔒</span>
                  <div>
                    <strong className="text-slate-900 text-sm sm:text-base">Use filters wisely:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">Add filters in Make.com to process only relevant data (e.g., only high-priority items, specific tags, or date ranges).</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg shrink-0">📊</span>
                  <div>
                    <strong className="text-slate-900 text-sm sm:text-base">Monitor regularly:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">Check your scenario execution history weekly to catch errors and optimize performance.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg shrink-0">⚡</span>
                  <div>
                    <strong className="text-slate-900 text-sm sm:text-base">Mind the rate limits:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">Both {sourceApp.name} and {destApp.name} have API rate limits. Space out operations if processing large volumes.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg shrink-0">🎯</span>
                  <div>
                    <strong className="text-slate-900 text-sm sm:text-base">Use error handlers:</strong>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">Add error handling modules to your scenario to get notified when something goes wrong instead of silent failures.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-10 md:mt-12 p-6 sm:p-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl text-white text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Automate?</h3>
            <p className="text-base sm:text-lg mb-6 opacity-90">
              Join thousands of teams saving 10+ hours per week with this integration
            </p>
            <a 
              href={`https://www.make.com/en/register?pc=jaymieblaze&source=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              <span>Get Started Free</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
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