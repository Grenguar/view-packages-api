import HALlink from "./halLink";

export interface PackageInfo {
  name: string;
  description: string;
  depends?: string[];
  dependents?: string[];
}

export interface PackageInfoHAL {
  name: string;
  description: string;
  depends?: HALlink[];
  dependents?: HALlink[];
}
