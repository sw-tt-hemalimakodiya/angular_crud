// angular import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  public isFormSubmitted: boolean = false;
  registerForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authServices: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'firstname': ['', [Validators.required]],
      'lastname': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$/)]],
      'password': ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]]
    })
  }

  hasFormError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  getElements(controlName: string) {
    return this.registerForm.get(controlName);
  }

  register() {
    // stop here if form is invalid
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value
    formData.username = `${formData.firstname} ${formData.lastname}`
    this.authServices.register(formData, (response) => {
      if (response.status == 200) {
        this.registerForm.reset();
        this.alertService.success(`User registered successfully`, { autoClose: true, keepAfterRouteChange: true })
        this.router.navigate(['/login']);
      } else {
        this.alertService.error(response.error.message, { autoClose: true, keepAfterRouteChange: true });
      }
    })
  }

  // public method
  SignUpOptions = [
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
