import HALlink from "./halLink";

export interface IPackageInfo {
  name: string;
  description: string;
  depends?: string[];
  dependents?: string[];
}

export interface IPackageInfoHAL {
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
