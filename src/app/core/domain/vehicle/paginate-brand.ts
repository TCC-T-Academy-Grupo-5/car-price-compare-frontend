import {Paginate} from '@domain/utils/paginate';
import {Brand} from '@domain/vehicle/brand';

export interface PaginatedBrand extends Paginate<Brand> {
  items: Brand[];
}
