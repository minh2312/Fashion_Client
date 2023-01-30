import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleFileService {
  private uri = "http://localhost:9999/api/v1"
  constructor(private http:HttpClient) { }


  upload(file:any):Observable<any> {
    var formData = new FormData();
    if(file != null){
      formData.append('img',file, file.name);
    }
    return this.http.post(`${this.uri}/upload-file`,formData,{ observe: 'response' })
}


}
