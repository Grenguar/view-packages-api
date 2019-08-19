export interface PackageInfo {
  name: string;
  description: string;
  depends?: string[];
  dependents?: string[];
}
