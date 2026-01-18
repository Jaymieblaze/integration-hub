import { apps } from "@/data/apps";
import { getAllCombinations } from "@/lib/combinations";
import { notFound } from "next/navigation";
import Link from "next/link";

// 1. Generate Static Params (Pre-builds all pages)
export async function generateStaticParams() {
  const combos = getAllCombinations();
  return combos.map((combo) => ({
    slug: combo.slug,
  }));
}

// 2. The Page Component
export default async function IntegrationPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const [sourceId, destId] = slug.split("-to-");
  const sourceApp = apps.find((a) => a.id === sourceId);
  const destApp = apps.find((a) => a.id === destId);

  if (!sourceApp || !destApp) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header Icons */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className={`w-16 h-16 ${sourceApp.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
            {sourceApp.name[0]}
          </div>
          <span className="text-gray-400 text-2xl">→</span>
          <div className={`w-16 h-16 ${destApp.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
            {destApp.name[0]}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          How to connect {sourceApp.name} to {destApp.name}
        </h1>
        
        <p className="text-lg text-gray-600 text-center mb-8">
          The ultimate guide to automating <strong>{sourceApp.name}</strong> and <strong>{destApp.name}</strong> in 2026.
        </p>

        {/* THE MONEY BUTTON (Affiliate Link) */}
        <div className="flex justify-center mb-12">
          <a 
            href={`https://www.make.com/en/register?pc=jaymieblaze&source=${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Free Template &rarr;
          </a>
        </div>

        {/* Content Section */}
        <div className="prose max-w-none text-gray-700">
          <h2 className="text-2xl font-semibold mb-3">Why integrate these two?</h2>
          <p className="mb-4">
            By connecting {sourceApp.name} (a leading {sourceApp.category} tool) with {destApp.name}, 
            you can save hours of manual work. For example, every time a new event happens in {sourceApp.name}, 
            you can automatically trigger an action in {destApp.name}.
          </p>
          
          <h2 className="text-2xl font-semibold mb-3">Common Use Cases</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sync data from {sourceApp.name} directly into {destApp.name}.</li>
            <li>Send notifications to {destApp.name} when updates occur in {sourceApp.name}.</li>
            <li>Archive important {sourceApp.name} records into {destApp.name}.</li>
          </ul>
        </div>

        {/* Internal Linking (SEO Boost) */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <h3 className="text-xl font-bold mb-4">See Other {sourceApp.name} Integrations</h3>
          <div className="flex flex-wrap justify-center gap-4">
             <Link href={`/`} className="text-blue-600 hover:underline">
               ← Back to Directory
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}