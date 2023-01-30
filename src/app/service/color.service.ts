import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private uri = "http://localhost:9999/api/v1"
  constructor(private http:HttpClient) { }


  getColor():Observable<any>{
    return this.http.get<any>(`${this.uri}/color/`);
  }


  saveColor(data:Color):Observable<any>{
    return this.http.post<any>(`${this.uri}/color/`,data);
  }

  findById(id:any):Observable<any>{
    return this.http.post<any>(`${this.uri}/color/findColorById`,{color_id:id});
  }

  updateColor(data:any):Observable<any>{
    return this.http.put<any>(`${this.uri}/color/`,data);
  }


  
}
