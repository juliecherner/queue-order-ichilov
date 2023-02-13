import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberMask',
})
export class PhoneNumberMaskPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    return value.model.toString().replace(/(\d{4})/g, '*** ****');
  }
}
