import { FormControl, ValidationErrors } from '@angular/forms';

export class Luv2ShopValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors|null {
    if((control.value!=null)&&(control.value.trim().length===0)){
        return {'notOnlyWhitespace':true}; //html里检测的就是这个名notOnlyWhitespace，与方法名相同只是convension
    }else{
        return null;
    }
  }
}
