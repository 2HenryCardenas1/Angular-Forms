import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})

export class BasicFormComponent implements OnInit {


  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  //Build Form

  private buildForm() {
    this.form = this.formBuilder.group({

      //Sub group
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        lastName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),

      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      color: ['#000000'],
      date: [''],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false],
      gender: [''],
      zone: ['']
    })
  }


  save() {
    

    if (this.form.valid) {
      //Data form

      console.log("ss", this.form.value)
    }
    else {
      //Mark all fields as touched
      this.form.markAllAsTouched()
    }
  }





  //Form Group

  get nameFieldValid() {
    return this.form.get('fullName').get('name').valid && this.form.get('fullName').get('name').touched
  }
  get nameFieldInvalid() {
    return this.form.get('fullName').get('name').invalid && this.form.get('fullName').get('name').touched
  }

  get nameField() {
    return this.form.get('fullName').get('name')
  }

  get lastField() {
    return this.form.get('fullName').get('lastName')
  }

  get emailField() {
    return this.form.get('email')
  }

  get telField() {
    return this.form.get('tel')
  }

  get colorField() {
    return this.form.get('color')
  }

  get dateField() {
    return this.form.get('date')
  }

  get ageField() {
    return this.form.get('age')
  }

  get categoryField() {
    return this.form.get('category')
  }

  get multipleChecksField() {
    return this.form.get('tag')
  }

  get agreeField() {
    return this.form.get('agree')
  }

  get radioField() {
    return this.form.get('gender')
  }

  get zoneField() {
    return this.form.get('zone')
  }


}
