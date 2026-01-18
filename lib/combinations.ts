import { apps } from "@/data/apps"; 
// If "@/" gives you an error, try: import { apps } from "../data/apps";

export function getAllCombinations() {
  const combinations = [];

  for (const source of apps) {
    for (const dest of apps) {
      if (source.id !== dest.id) {
        combinations.push({
          source,
          dest,
          slug: `${source.id}-to-${dest.id}`,
        });
      }
    }
  }
  return combinations;
}