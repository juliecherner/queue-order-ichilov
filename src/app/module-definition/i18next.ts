import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import {
  I18NextModule,
  ITranslationService,
  I18NEXT_SERVICE,
  defaultInterpolationFormat,
} from 'angular-i18next';
import i18nextLanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { Languages } from '../../assets/constants';

export const defaultLanguage = Languages.English;
export const supportedLanguages = Object.values(Languages);

export function appInit(i18next: ITranslationService) {
  return () =>
    i18next
      .use(HttpApi)
      .use(i18nextLanguageDetector)
      .init({
        load: 'languageOnly',
        supportedLngs: supportedLanguages,
        fallbackLng: defaultLanguage,
        debug: true,
        returnEmptyString: false,
        ns: ['translation', 'validation', 'error'],
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat),
        },
        backend: {
          loadPath: 'assets/locales/{{lng}}/{{ns}}.json',
        },
      });
}
export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory,
  },
];
