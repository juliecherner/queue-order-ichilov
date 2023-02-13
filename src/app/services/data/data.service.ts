import { getLocaleDateFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data = new BehaviorSubject<any>(null);

  constructor() {}

  changeData(data: any) {
    this.data.next(data);
  }

  getData() {
    return this.data.asObservable();
  }
}
