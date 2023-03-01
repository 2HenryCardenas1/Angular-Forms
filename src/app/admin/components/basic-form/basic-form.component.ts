import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
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
  preferenciasField = new FormControl();



  constructor() { }

  ngOnInit(): void {
    // escuchar cambios en el valor del campo
    this.nameField.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  getNameValue() {
    console.log(this.nameField.value)
    if (1 >= 1) {

    }
  }

  get isNameFieldValid() {
   return  this.nameField.valid && this.nameField.touched
  }
  get isNameFieldInvalid() {
    return this.nameField.invalid && this.nameField.touched
  }

}
