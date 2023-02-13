export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const years = Array.from({ length: 123 }, (_, i) => 2023 - i);

export enum Languages {
  English = 'en',
  Hebrew = 'he',
  Russian = 'ru',
  Arabic = 'ar',
}

export let initialRegistrationForm = {
  isPassport: false,
  firstName: '',
  lastName: '',
  idNumber: '',
  day: '',
  month: '',
  year: '',
  reason: '',
  phoneIndex: '+972',
  phoneBase: '',
  HMO: '',
  city: '',
  agreement: false,
};
