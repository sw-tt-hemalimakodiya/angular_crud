import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login_url : string = `${environment.BASE_API_URL}${environment.USER.LOGIN}`
  register_url : string = `${environment.BASE_API_URL}${environment.USER.REGISTER}`

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(payload, cb) {
    return this.http.post(this.register_url, payload).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }

  login(payload, cb) {
    return this.http.post(this.login_url, payload).subscribe(
      response => {
        return cb(response)
      }, 
      error => {
        return cb(error)
      }
    );
  }

  SetSelectedUserProfile(data: string, remeberMe: boolean) {
    if (remeberMe) {
      return window.localStorage.setItem(environment.USER_PROFILE, data);
    } else {
      return window.sessionStorage.setItem(environment.USER_PROFILE, data);
    }
  }

  IsAuthenticated() {
    const userProfile = window.localStorage.getItem(environment.USER_PROFILE) || window.sessionStorage.getItem(environment.USER_PROFILE);
    if (userProfile) {
      const userProfile2 = JSON.parse(userProfile);
      if (userProfile2 && userProfile2.data && userProfile2.data.authToken) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  }

  getToken() {
    const userProfile = window.localStorage.getItem(environment.USER_PROFILE) || window.sessionStorage.getItem(environment.USER_PROFILE);
    if (userProfile) {
      const userProfile2 = JSON.parse(userProfile)
      if (userProfile2 && userProfile2.data && userProfile2.data.authToken) {
        return userProfile2.data.authToken;
      } else {
        return null;
      }
    }
    else {
      return null;
    }
  }

  logout(){
    window.localStorage.removeItem(environment.USER_PROFILE);
    window.sessionStorage.removeItem(environment.USER_PROFILE);
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }
}
