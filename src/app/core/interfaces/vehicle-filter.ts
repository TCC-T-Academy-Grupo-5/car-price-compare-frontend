import {Vehicle} from "@models/vehicle";

export interface VehicleFilter {
  applyFilter(vehicle: Vehicle, filters: VehicleFilterOptions): boolean;
}

export interface VehicleFilterOptions {
  make?: string;
  model?: string;
  year?: number;
  priceRange?: [number, number];
  type: number | null;
}
