import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IBrand} from "../interfaces/i-brand";

@Injectable({
  providedIn: 'root'
})
export class GetBrandsService {
  constructor(
    public http: HttpClient,
  ) {
  }

  public url = "json/brands.json";

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.url);
  }

  getBrandById(id: number): Observable<IBrand | undefined> {
    return this.http.get<IBrand[]>(this.url).pipe(
      map((brands: IBrand[]) => brands.find(brand => brand.id === id))
    );
  }

}
