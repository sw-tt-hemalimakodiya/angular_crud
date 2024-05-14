// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { ModelComponent } from './components/model/model.component';
import LoginComponent from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ModelComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    HttpClient,
    provideHttpClient(withInterceptors(
      [jwtInterceptor]
    ))
  ],
})
export class AppModule { }
