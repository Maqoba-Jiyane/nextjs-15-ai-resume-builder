// template.types.ts
export type Tier = "free" | "premium";
export type TemplateType = "Graphic" | "Classic" | "Minimal" | "ATS";
export type Layout = "one-column" | "two-column" | "three-column";
export type Density = "compact" | "balanced" | "spacious";
export type PageSize = "A4" | "Letter";

export type TemplateId =
  | "classic"
  | "science-engineering-resume"
  | "classic-resume-rich"
  | "black-modern-professional"
  | "blue-creative-resume"
  | "mordern-sidebar-resume";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  previewImage: string;
  description: string;
  tier: Tier;
  type: TemplateType;

  // New filterable facets
  layout: Layout;                 // overall layout
//   density: Density;               // content density
  columns: 1 | 2 | 3;             // quick filter
//   accentColor: string;            // hex
//   palette: string[];              // color tokens for filtering ("blue","navy","gold","dark")
//   fonts: {
//     headings: string;
//     body: string;
//     extras?: string[];
//   };
//   features: string[];             // e.g. ["angled-header","svg-bands","progress-bars"]
  industries?: string[];          // suggested uses
  tags: string[];                 // search tokens
//   atsSafe: boolean;               // graphics-light, machine parseable
  photoSupport: boolean;          // supports avatar/photo
  multiPage: boolean;
//   pageSize: PageSize;             // default page size
//   aspect?: string;                // e.g. "210/297"

  // Optional operational flags
//   printSafeBackgrounds?: boolean; // designed for full-bleed backgrounds
//   rtlSupport?: boolean;           // right-to-left languages
  version?: string;
}
  
  // filter.ts
export interface TemplateFilter {
    tiers?: Tier[];
    types?: TemplateType[];
    layouts?: Layout[];
    colors?: string[];          // matches palette tokens
    features?: string[];        // must include all
    atsSafe?: boolean;
    photoSupport?: boolean;
    columns?: (1 | 2 | 3)[];
    search?: string;            // fuzzy-ish on name/tags/description
  }
  
  export function filterTemplates<T extends TemplateMeta>(
    items: T[],
    f: TemplateFilter
  ): T[] {
    const q = f.search?.trim().toLowerCase();
    return items.filter(t => {
      if (f.tiers && !f.tiers.includes(t.tier)) return false;
      if (f.types && !f.types.includes(t.type)) return false;
      if (f.layouts && !f.layouts.includes(t.layout)) return false;
      if (f.columns && !f.columns.includes(t.columns)) return false;
    //   if (typeof f.atsSafe === "boolean" && t.atsSafe !== f.atsSafe) return false;
      if (typeof f.photoSupport === "boolean" && t.photoSupport !== f.photoSupport) return false;
    //   if (f.colors && f.colors.length && !f.colors.some(c => t.palette.map(p=>p.toLowerCase()).includes(c.toLowerCase()))) return false;
    //   if (f.features && f.features.length && !f.features.every(feat => t.features.includes(feat))) return false;
  
      if (q) {
        const hay = `${t.name} ${t.description} ${t.tags.join(" ")}`.toLowerCase();
        if (!q.split(/\s+/).every(tok => hay.includes(tok))) return false;
      }
      return true;
    });
  }
  
  // derive available facets from data
export function deriveFacets(items: TemplateMeta[]) {
    const uniq = <T,>(arr: T[]) => [...new Set(arr)];
    return {
      tiers: uniq(items.map(i => i.tier)),
      types: uniq(items.map(i => i.type)),
      layouts: uniq(items.map(i => i.layout)),
      columns: uniq(items.map(i => i.columns)).sort(),
    //   colors: uniq(items.flatMap(i => i.palette)),
    //   features: uniq(items.flatMap(i => i.features)),
    };
  }
  