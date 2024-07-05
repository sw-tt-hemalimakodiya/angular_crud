import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url : string = `${environment.BASE_API_URL}${environment.PRODUCT}`

  constructor(private http: HttpClient) { }

  getProduct(params, cb) {
    return this.http.get(this.url, {params}).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  addProduct(body, cb) {
    return this.http.post(this.url, body).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  getProductById(id, cb) {
    return this.http.get(`${this.url}/${id}`).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  deleteProduct(id, cb) {
    return this.http.delete(`${this.url}/${id}`).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  editProduct(id, body, cb) {
    return this.http.put(`${this.url}/${id}`, body).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }
}
