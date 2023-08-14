import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request and modify the URL to include the base URL
    const baseUrl = environment.BASE_API_URL;
    const modifiedReq = req.clone({
      url: `${baseUrl}${req.url}`
    });
    
    // Pass the modified request to the next interceptor or handler
    return next.handle(modifiedReq);
  }
}
