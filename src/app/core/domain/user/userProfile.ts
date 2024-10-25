import { FipePrice } from "./fipePrice";
import { Rating } from "./rating";

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    cellphone: string;
    favorites: FipePrice[];
    rating: Rating[]
}