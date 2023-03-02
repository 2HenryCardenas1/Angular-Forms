import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }


  static validPassword(control: AbstractControl) {
    // value of controller
    const value = control.value;

    if (!containNumbers(value)) {
      return { password_invalid: true };
    }
    return null;
  }

}


function containNumbers( value : string){
  return value.split('').find( char => isNumber(char) !== undefined);
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10));
}
