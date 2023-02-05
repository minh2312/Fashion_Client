import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private uri = "http://localhost:9999/api/v1"
  constructor(private http:HttpClient) { }

  getProduct():Observable<any>{
    return this.http.get<any>(`${this.uri}/product/`);
  }
  
  addNewProduct(data:Product):Observable<any>{
    return this.http.post<any>(`${this.uri}/product`,data)
  }
}
