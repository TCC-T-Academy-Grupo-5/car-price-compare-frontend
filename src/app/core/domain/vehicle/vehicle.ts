import {VehicleFilters} from '@domain/vehicle/vehicle-filters';

export interface Vehicle extends VehicleFilters {
  id?: string;
  fullUrl?: string;
  imageUrl?: string;
  name?: string;
  fipePrice?: number;
  priceRange?: [number, number];
  urlPathName?: string;
}
