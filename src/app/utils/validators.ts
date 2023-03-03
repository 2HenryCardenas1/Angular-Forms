import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CategoriesService } from './../core/services/categories.service';


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
    const value = control.value;
    if (!containsNumber(value)) {
      return { invalid_password: true };
    }
    return null;
  }

  static passwordsMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) {
      return null;
    }
    return { passwords_not_match: true };
  }

  //Validation async

  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checKCategory(value)
        .pipe( // usamos el pipe para transformar la respuesta a un observable
          map((res: any) => {
            const isAvailable = res.isAvailable;
            if (!isAvailable) {
              return { category_not_available: true }
            }
            return null;
          })
        );
    };
  }

}


function containsNumber(value: string) {
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string) {
  return !isNaN(parseInt(value, 10));
}