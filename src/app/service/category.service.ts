import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private uri = "http://localhost:9999/api/v1"
  constructor(private http:HttpClient) { }

  getCategory():Observable<any>{
    return this.http.get<any>(`${this.uri}/category/`);
  }

  getCategoryById(category_id:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/category/`+"findCategoryById",{category_id:category_id});
  }


  getCategoryPareant0():Observable<any>{
    return this.http.get<any>(`${this.uri}/category/`+"getCategoryPareant0");
  }


  getCategoryPareantByIdCategory(category_id:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/category/`+"getCategoryPareant",{category_id:category_id});
  }


  addCategory(data:Category):Observable<any>{
    return this.http.post<any>(`${this.uri}/category/`,data);
  }

  updateCategory(data:Category):Observable<any>{
    return this.http.put<any>(`${this.uri}/category/`,data);
  }

  searchCategory(keyword_data:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/category/`+"search",{keyword:keyword_data});
  }


  deletesCategory(id:any):Observable<any>{
    return this.http.put<any>(`${this.uri}/category/`+"deleteCategory",{category_id:id});
  }
}
