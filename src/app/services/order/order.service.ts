import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationFormData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://localhost:8080/api/order';
  constructor(private httpClient: HttpClient) {}

  saveOrder(order: RegistrationFormData): Observable<any> {
    return this.httpClient.post<any>(this.url, order);
  }
}
