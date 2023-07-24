import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isFormSubmitted: boolean = false;
  loginForm!: FormGroup

  constructor(private fb: FormBuilder,
    private authServices: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]/)]],
    })
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  getElements(controlName: string) {
    return this.loginForm.get(controlName);
  }

  login(){
    // stop here if form is invalid
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let formData = this.loginForm.value
    this.authServices.login(formData, (response : any) => {
      if (response.status == 200 && !response.hasOwnProperty('error')) {
        this.authServices.SetSelectedUserProfile(JSON.stringify(response));
        this.toastr.success('User Login Successfully');
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else if (response.hasOwnProperty('error')) {
        this.toastr.error(response.error.message);
      }
    })
  }
}
