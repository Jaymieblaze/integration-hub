// import { getAllCombinations } from "@/lib/combinations";
// import Link from "next/link";

// export default function Home() {
//   const combinations = getAllCombinations();

//   return (
//     <div className="min-h-screen bg-white p-8 md:p-16">
//       {/* Header Section */}
//       <div className="max-w-4xl mx-auto text-center mb-16">
//         <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
//           Integration<span className="text-blue-600">Hub</span>
//         </h1>
//         <p className="text-xl text-slate-600 mb-8">
//           The automation directory. Connect your favorite apps instantly.
//         </p>
//       </div>

//       {/* Grid of All Integrations */}
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl font-bold mb-6 text-slate-800">Available Connections</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {combinations.map((combo) => (
//             <Link 
//               key={combo.slug} 
//               href={`/integration/${combo.slug}`}
//               className="group block p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
//             >
//               <div className="flex items-center space-x-4">
//                 {/* Icons */}
//                 <div className="flex -space-x-3">
//                   <div className={`w-10 h-10 ${combo.source.color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
//                     {combo.source.name[0]}
//                   </div>
//                   <div className={`w-10 h-10 ${combo.dest.color} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
//                     {combo.dest.name[0]}
//                   </div>
//                 </div>
                
//                 {/* Text */}
//                 <div>
//                   <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
//                     {combo.source.name} + {combo.dest.name}
//                   </h3>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
import { getAllCombinations } from "@/lib/combinations";
import SearchGrid from "@/components/SearchGrid";

export default function Home() {
  const combinations = getAllCombinations();

  return (
    <div className="min-h-screen bg-white p-8 md:p-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Integration<span className="text-blue-600">Hub</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          The automation directory. Connect your favorite apps instantly.
        </p>
      </div>

      {/* Search & Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">
          Find Your Integration
        </h2>
        
        {/* Pass data to Client Component */}
        <SearchGrid combinations={combinations} />
      </div>
    </div>
  );
}