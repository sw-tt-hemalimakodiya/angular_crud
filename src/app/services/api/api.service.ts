import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getRequest(url: string, params: any, cb: any){
    return this.http.get(url, {params}).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }

  postRequest(url: any, payload: any, cb: any){
    return this.http.post(url, payload).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }

  putRequest(url: any, payload: any, params: any, cb: any){
    return this.http.put(url, payload, {params}).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }

  deleteRequest(url: any, params: any, cb: any){
    return this.http.delete(url, {params}).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }
}
