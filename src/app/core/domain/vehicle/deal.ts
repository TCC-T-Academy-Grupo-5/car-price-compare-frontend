export interface Deal {
  vehicleId: string;
  store: string;
  price: number;
  fipePriceDiff?: number;
  fipePriceDiffPercentage?: number;
  mileageInKm: number;
  modelName: number;
  versionName: number;
  year: string;
  dealUrl: string;
  imageUrl: string;
  isFullMatch: boolean;
  city: string;
  state: string;
  scrapedAt: Date;
}
