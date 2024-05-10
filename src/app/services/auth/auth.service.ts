import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(payload: any, cb: any) {
    return this.http.post(environment.USER.LOGIN, payload).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }
}
