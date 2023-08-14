import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_crud';
  isAuthanticated: any = false

  constructor(private authService : AuthService) { }
  
  ngOnInit() {
    this.isAuthanticated = this.authService.IsAuthenticated();
  }

  ngDoCheck(){
    this.isAuthanticated = this.authService.IsAuthenticated();
  }
}
