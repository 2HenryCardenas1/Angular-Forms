import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})

export class BasicFormComponent implements OnInit {

  //FormGroup

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(''),
    tel: new FormControl(''),
    color: new FormControl('#000000'),
    date: new FormControl(''),
    age: new FormControl(12),
    category: new FormControl(''),
    multipleChecks: new FormControl(''),
    agree: new FormControl(false),
    gender: new FormControl(''),
    zone: new FormControl(''),


  })

  /* nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  email = new FormControl('');
  telField = new FormControl('');
  colorField = new FormControl('');
  dateField = new FormControl('');
  numberField = new FormControl('');

  categoryField = new FormControl('value1');
  multipleChecksField = new FormControl();

  agreeField = new FormControl(false);

  radioField = new FormControl('');
  zoneField = new FormControl('');
  preferenciasField = new FormControl(); */



  constructor() { }

  ngOnInit(): void {

  }

  getNameValue() {
    console.log(this.form.valid)

  }

  save() {
    //Data form

    console.log(this.form.value)
  }




  //Form Group

  get nameFieldValid() {
    return this.form.get('name').valid && this.form.get('name').touched
  }
  get nameFieldInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched
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
    return this.form.get('multipleChecks')
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








  //Form Control
  /* 
    get isNameFieldValid() {
      return this.nameField.valid && this.nameField.touched
    }
    get isNameFieldInvalid() {
      return this.nameField.invalid && this.nameField.touched
    } */

}
