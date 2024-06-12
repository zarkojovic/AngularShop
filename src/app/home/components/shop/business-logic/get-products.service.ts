import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, filter, forkJoin, map, Observable, of, switchMap} from "rxjs";
import {IProduct} from "../interfaces/i-product";
import {ISingleProduct} from "../interfaces/i-single-product";
import {GetCategoriesService} from "./get-categories.service";
import {GetBrandsService} from "./get-brands.service";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  constructor(
    public http: HttpClient,
    public CategoryService: GetCategoriesService,
    public BrandService: GetBrandsService
  ) {
  }

  private productsUrl = 'json/products.json';

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl);
  }


  getProductById(id: number): Observable<ISingleProduct | undefined> {
    return this.http.get<IProduct[]>(this.productsUrl).pipe(
      map((products: IProduct[]) => products.find(product => product.id === id)),
      switchMap((product: IProduct | undefined) => {
        if (!product) {
          return of(undefined);
        }
        return forkJoin({
          product: of(product),
          brand: this.BrandService.getBrandById(product.brandId),
          category: this.CategoryService.getCategoryById(product.categoryId)
        }).pipe(
          map(({product, brand, category}) => ({
            ...product,
            brandName: brand?.title,
            categoryName: category?.title
          }))
        );
      }),
      catchError(error => {
        console.error('Error fetching product details:', error);
        return of(undefined);
      })
    );
  }

}
