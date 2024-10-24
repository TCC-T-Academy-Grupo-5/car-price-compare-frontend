export interface VehicleFilters {
  model?: string;
  brand?: string;
  fipePrice?: number;
  vehicleType?: number | string;
  year?: string;
  page: number;
  pageSize: number;
}
