import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = "http://localhost:8080/api/tutorials";
@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<any> {
    return this.httpClient.get(baseUrl);
  }

  get(id: number): Observable<any>{
    return this.httpClient.get(`${baseUrl}/${id}`);
  }

  create(tutorial:any) : Observable<any> {
    return this.httpClient.post(baseUrl,tutorial);
  }

  update(id: number, data:any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseUrl);
  }
  
  findByTitle(title: string): Observable<any>{
    return this.httpClient.get(`${baseUrl}?title=${title}`);
  }

}
