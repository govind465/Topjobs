import { FormControl } from '@angular/forms';

export class UsernameValidator {

  static validUsername(fc: FormControl) {
    if (fc.value.toLowerCase() === 'comparewithDBvalues' || fc.value.toLowerCase() === 'COMPAREWITHDBVALUES') {
      return {
        validUsername: true
      };
    } else {
      return null;
    }
  }
}
