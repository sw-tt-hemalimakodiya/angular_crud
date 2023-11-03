import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService : AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and modify the URL to include the base URL
    const baseUrl = environment.BASE_API_URL;

    const token = this.authService.getToken();
    const headerSettings = { "authorization" : `Bearer ${token}`}
    const newHeader = new HttpHeaders(headerSettings);
    const modifiedReq = req.clone({
      url: `${baseUrl}${req.url}`,
      headers: newHeader
    });
    
    // Pass the modified request to the next interceptor or handler
    return next.handle(modifiedReq);
  }
}
