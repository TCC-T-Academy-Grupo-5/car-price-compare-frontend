import {FipePrice} from '@models/fipeprice';

export interface VehicleDetails {
  id: string;
  fipeCode: string;
  name: string;
  model: string;
  modelImageUrl: string;
  brand: string;
  brandImageUrl: string;
  year: string;
  type: string;
  category: string;
  price: number;
  fipePrices: FipePrice[];
}
