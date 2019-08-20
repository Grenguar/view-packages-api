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
  _embedded?: {
    depends?: HALlink[];
    dependents?: HALlink[];
  };
  depends?: HALlink[];
  dependents?: HALlink[];
  next?: HALlink;
  prev?: HALlink;
}
