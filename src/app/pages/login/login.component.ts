// angular import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  public isFormSubmitted: boolean = false;
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authServices: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]/)]],
    })
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login(){
    // stop here if form is invalid
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value
    this.authServices.login(formData, (response) => {
      if (response.status == 200) {
        this.authServices.SetSelectedUserProfile(JSON.stringify(response));
        this.loginForm.reset();
        this.alertService.success(`User login successfully`, { autoClose: true, keepAfterRouteChange: true })
        this.router.navigate(['/admin']);
      } else {
        this.alertService.error(response.error.message, { autoClose: true, keepAfterRouteChange: true });
      }
    })
  }

  getElements(controlName: string) {
    return this.loginForm.get(controlName);
  }

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
}
