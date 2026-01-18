// import { apps } from "@/data/apps"; 
// import { getAllCombinations } from "@/lib/combinations"; 
// import Link from "next/link";
// import { notFound } from "next/navigation";

// // 1. Tell Next.js to pre-build ALL these pages at build time
// export async function generateStaticParams() {
//   const combos = getAllCombinations();
//   return combos.map((combo) => ({
//     slug: combo.slug,
//   }));
// }

// // 2. The Page Component
// // Notice we made this function 'async' so we can await params
// export default async function IntegrationPage({ params }: { params: Promise<{ slug: string }> }) {
  
//   // FIX: In Next.js 15+, params is a Promise. We must await it first.
//   const resolvedParams = await params;
//   const { slug } = resolvedParams;

//   const [sourceId, destId] = slug.split("-to-");

//   const sourceApp = apps.find((a) => a.id === sourceId);
//   const destApp = apps.find((a) => a.id === destId);

//   // If URL is invalid, show 404
//   if (!sourceApp || !destApp) {
//     return notFound();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
//       <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
//         <div className="flex items-center justify-center space-x-4 mb-6">
//           <div className={`w-16 h-16 ${sourceApp.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
//             {sourceApp.name[0]}
//           </div>
//           <span className="text-gray-400 text-2xl">→</span>
//           <div className={`w-16 h-16 ${destApp.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
//             {destApp.name[0]}
//           </div>
//         </div>

//         <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
//           How to connect {sourceApp.name} to {destApp.name}
//         </h1>
        
//         <p className="text-lg text-gray-600 text-center mb-8">
//           The ultimate guide to connecting <strong>{sourceApp.name}</strong> and <strong>{destApp.name}</strong>.
//         </p>

//         <div className="flex justify-center mb-12">
//           <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full">
//             Start Automation &rarr;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
import { apps } from "@/data/apps";
import { getAllCombinations } from "@/lib/combinations";
import Link from "next/link";

export default function Home() {
  const combinations = getAllCombinations();

  return (
    <div className="min-h-screen bg-white p-8 md:p-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Integration<span className="text-blue-600">Hub</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          The world's largest directory of automation guides. 
          Connect your favorite apps instantly.
        </p>
      </div>

      {/* Grid of All Apps */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Popular Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {combinations.map((combo) => (
            <Link 
              key={combo.slug} 
              href={`/integration/${combo.slug}`}
              className="group block p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="flex items-center space-x-4">
                {/* Icons */}
                <div className="flex -space-x-3">
                  <div className={`w-10 h-10 ${combo.source.color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                    {combo.source.name[0]}
                  </div>
                  <div className={`w-10 h-10 ${combo.dest.color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                    {combo.dest.name[0]}
                  </div>
                </div>
                
                {/* Text */}
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                    {combo.source.name} + {combo.dest.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Connect {combo.source.name} to {combo.dest.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}