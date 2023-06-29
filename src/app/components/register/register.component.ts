import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'username': ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]/)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]/)]],
    })
  }

  public hasFormError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  getElements(controlName: string){
    return this.registerForm.get(controlName);
  }
  register(){

  }

}
