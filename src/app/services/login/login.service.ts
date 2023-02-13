import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { phoneCodeItem, CityFullInfo } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isRegistered: boolean = false;
  phoneCodesUrl =
    'https://gist.githubusercontent.com/devhammed/78cfbee0c36dfdaa4fce7e79c0d39208/raw/07df5ed443941c504c65e81c83e6313473409d4c/countries.json';

  citiesUrl =
    'https://raw.githubusercontent.com/Binternet/israel-cities/master/cities.json';

  // googleTranslationAPI =
  //   'https://translation.googleapis.com/language/translate/v2';

  constructor(private httpClient: HttpClient) {}

  getPhoneCodesList(): Observable<phoneCodeItem[]> {
    return this.httpClient.get<any>(this.phoneCodesUrl).pipe(retry(1));
  }

  getCitiesList(): Observable<CityFullInfo[]> {
    return this.httpClient.get<any>(this.citiesUrl).pipe(retry(1));
  }

  markUserAsRegistered() {
    this.isRegistered = true;
  }

  formatCityList(list: any[], language: string) {
    const fields = {
      nameInEnglish: 'english_name',
      nameInHebrew: 'name',
    };

    const fieldName =
      language === 'he' ? fields.nameInHebrew : fields.nameInEnglish;

    return list
      .filter(
        (item, index) =>
          index > 0 && item[fields.nameInEnglish] && item[fields.nameInHebrew]
      )
      .map((item) => item[fieldName]);
  }

  // getCitiesTranslation(
  //   textForTranslation: any,
  //   targetLanguage: string
  // ): Observable<any> {
  //   return this.httpClient.post<any>(this.googleTranslationAPI, {
  //     q: textForTranslation,
  //     source: 'en',
  //     target: targetLanguage,
  //     format: 'text',
  //   });
  // }
}
