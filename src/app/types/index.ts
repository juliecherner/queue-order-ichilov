export type Order = {
  firstName: string;
  lastName: string;
  idNumber: string;
  isPassport: boolean;
  birthDate: string;
  reason: string;
  phoneNumber: string;
  HMO: string;
  city: string;
  agreement: boolean;
};

export type RegistrationFormData = {
  firstName: string;
  lastName: string;
  idNumber: string;
  isPassport: boolean;
  day: string;
  month: string;
  year: string;
  reason: string;
  phoneIndex: string;
  phoneBase: string;
  HMO: string;
  city: string;
  agreement: boolean;
};

export type CodesAndFlag = {
  dial_code: string;
  flag: string;
};

export interface phoneCodeItem extends CodesAndFlag {
  code: string;
  name: string;
}

export type CityFullInfo = {
  semel_yeshuv: string;
  name: string;
  english_name: string;
  semel_napa: string;
  shem_napa: string;
  semel_lishkat_mana: string;
  lishka: string;
  semel_moatza_ezorit: string;
  shem_moaatza: string;
};

export type Language = 'en' | 'he' | 'ru' | 'ar';

export type CustomDate = {
  day: string;
  time: string;
};

export type LayoutDirection = 'ltr' | 'rtl';
