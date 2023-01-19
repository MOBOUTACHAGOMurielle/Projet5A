import {
    AbstractControl,
    ValidatorFn,
    FormControl,
    FormGroup
  } from '@angular/forms';
  
  export class CustomValidators {
    constructor() {}
  
    static onlyChar(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value == '') return null;
  
        let re = new RegExp('^[a-zA-Z ]*$');
        if (re.test(control.value)) {
          return null;
        } else {
          return { onlyChar: true };
        }
      };
    }
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
          const control = controls.get(controlName);
          const checkControl = controls.get(checkControlName);
    
          if (checkControl?.errors && !checkControl.errors['matching']) {
            return null;
          }
    
          if (control?.value !== checkControl?.value) {
            controls.get(checkControlName)?.setErrors({ matching: true });
            return { matching: true };
          } else {
            return null;
          }
        };
      }
  }