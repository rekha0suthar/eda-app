export interface FilterOptions {
  brands: string[];
  pack_types: string[];
  ppgs: string[];
  channels: string[];
  years: number[];
}

export interface ChartData {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
}

export interface Filters {
  brand: string;
  pack_type: string;
  ppg: string;
  channel: string;
  year: string;
}
