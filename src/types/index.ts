export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export type FilterValue = string | number | boolean | null;

export interface Filters {
  search: string;
  size: number | null;
  allowed_on_road: boolean | null;
  allows_heavy_waste: boolean | null;
}

export type FilterKey = keyof Filters;

export interface SkipsState {
  skips: Skip[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  selectedSkipId: number | null;
}
