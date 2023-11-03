import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  formProvider: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
        .then(() => {
          this.router.navigate(['/auth/login']);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]],
    },
      {
        validators: MyValidators.passwordsMatch // <-- Here we pass the custom validator.
      });

    // Here we subscribe to the valueChanges observable of the type field.
    this.typeField.valueChanges.subscribe(value => {
      console.log(value);
      if (value === 'company') {
        this.companyNameField.setValidators([Validators.required]); // <-- Here we add the required validator.
        this.formProvider = this.formBuilder.group({
          name: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
        })
      } else {
        this.companyNameField.setValidators(null);
      }

      this.companyNameField.updateValueAndValidity(); // <-- Here we update the value and validity of the field.
    });
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get typeField() {
    return this.form.get('type');
  }

  get companyNameField() {

    return this.form.get('companyName');
  }

}
