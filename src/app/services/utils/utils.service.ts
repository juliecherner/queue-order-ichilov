import { Injectable } from '@angular/core';
import { Languages } from '../../../assets/constants';
import {
  RegistrationFormData,
  Order,
  Language,
  CustomDate,
  LayoutDirection,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  defineLanguageDirection(language: Language): LayoutDirection {
    switch (language) {
      case Languages.English:
        return 'ltr';
      case Languages.Russian:
        return 'ltr';
      case Languages.Hebrew:
        return 'rtl';
      case Languages.Arabic:
        return 'rtl';
      default:
        return 'ltr';
    }
  }

  formatCityList(list: any[], language: Language) {
    const fields = {
      nameInEnglish: 'english_name',
      nameInHebrew: 'name',
    };

    const fieldName =
      language === Languages.Hebrew
        ? fields.nameInHebrew
        : fields.nameInEnglish;

    return list
      .filter(
        (item, index) =>
          index > 0 && item[fields.nameInEnglish] && item[fields.nameInHebrew]
      )
      .map((item) => item[fieldName]);
  }

  formatFormToOrder(form: RegistrationFormData): Order {
    const birthDate = form.month + '/' + form.day + '/' + form.year;
    const phoneNumber = form.phoneIndex + form.phoneBase;

    return {
      firstName: form.firstName,
      lastName: form.lastName,
      idNumber: form.idNumber,
      isPassport: form.isPassport,
      birthDate,
      reason: form.reason,
      phoneNumber: phoneNumber,
      HMO: form.HMO,
      city: form.city,
      agreement: form.agreement,
    };
  }

  generateTimeAndDate(): CustomDate {
    const date = new Date();

    const day =
      date.getDate() + '\\' + (date.getMonth() + 1) + '\\' + date.getFullYear();

    const time =
      this.padTo2Digits(date.getHours()) +
      ':' +
      this.padTo2Digits(date.getMinutes());

    return { day, time };
  }

  padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }
}
