import {IProduct} from "./i-product";

export interface ISingleProduct extends IProduct {
  brandName?: string;
  categoryName?: string;
}
