import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url : string = `${environment.BASE_API_URL}${environment.CATEGORY}`

  constructor(private http: HttpClient) { }

  getCategory(params, cb) {
    return this.http.get(this.url, {params}).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  addCategory(body, cb) {
    return this.http.post(this.url, body).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  getCategoryById(id, cb) {
    return this.http.get(`${this.url}/${id}`).subscribe(
      response => {
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  deleteCategory(id, cb) {
    return this.http.delete(`${this.url}/${id}`).subscribe(
      response => {
        console.log('deleteCategory ==== ', response);
        return cb(response)
      },
      error => {
        return cb(error)
      }
    );
  }

  editCategory(id, body, cb) {
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
