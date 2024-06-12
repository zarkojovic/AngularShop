import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ICategory} from "../interfaces/i-category";

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {

  constructor(
    public http: HttpClient,
  ) {
  }

  private url = "json/categories.json";

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url);
  }

  getCategoryById(id: number): Observable<ICategory | undefined> {
    return this.http.get<ICategory[]>(this.url).pipe(
      map((categories: ICategory[]) => categories.find(category => category.id === id))
    );
  }
}
