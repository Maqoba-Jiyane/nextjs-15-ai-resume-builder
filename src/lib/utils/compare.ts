// For shallow comparison of strings
export function shallowCompareFields<T extends object>(a: T, b: T, fields: (keyof T)[]): boolean {
    return fields.some((key) => (a[key] ?? "") !== (b[key] ?? ""));
  }
  
  // For comparing string arrays
  export function arraysAreEqual(a: string[] = [], b: string[] = []): boolean {
    return a.length === b.length && a.every((val, idx) => val === b[idx]);
  }
  
  // For comparing object arrays (e.g. educations, experiences)
  export function objectArraysEqual<T>(a: T[] = [], b: T[] = []): boolean {
    return JSON.stringify(a) === JSON.stringify(b); // simple deep comparison
  }
  