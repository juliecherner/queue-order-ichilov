import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegistrationFormData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiUrl + '/order';

  constructor(private httpClient: HttpClient) {}

  saveOrder(order: RegistrationFormData): Observable<any> {
    return this.httpClient.post<any>(this.url, order);
  }
}
