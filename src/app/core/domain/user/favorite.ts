import { FipePrice } from "./fipePrice";

export interface Favorites {
    id: string,
    fipeCode: string,
    name: string,
    model: string,
    modelImageUrl: string,
    brand: string,
    brandImageUrl: string,
    year: string,
    type: string,
    category: string,
    fipePrices: FipePrice[]
}