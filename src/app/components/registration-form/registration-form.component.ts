import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import i18next, { t } from 'i18next';
import {
  defaultLanguage,
  supportedLanguages,
} from '../../module-definition/i18next';
import { LoginService } from '../../services/login/login.service';
import { OrderService } from '../../services/order/order.service';
import { DataService } from '../../services/data/data.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LayoutDirection } from '../../types';
import './registration-form.component';

import {
  days as daysAmount,
  years as yearsAmount,
  initialRegistrationForm,
} from '../../../assets/constants';
import {
  RegistrationFormData,
  Order,
  Language,
  CodesAndFlag,
} from '../../types';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @ViewChild('form') form: NgForm;

  isLoading: boolean = false;
  currentLanguage: Language;
  languages: string[] = supportedLanguages;
  codesAndFlags: CodesAndFlag[] = [];
  cities: string[] = [];
  days = daysAmount;
  years = yearsAmount;
  baseCodeAndFlag = '🇮🇱 +972';
  baseCode = '+972';
  initialFormValue: RegistrationFormData = initialRegistrationForm;
  layoutDirection: LayoutDirection = 'ltr';

  readonly months = t('registration.months', {
    returnObjects: true,
  }) as string[];
  readonly reasons = t('registration.reasons', {
    returnObjects: true,
  }) as string[];
  readonly HMOs = t('registration.HMOs', {
    returnObjects: true,
  }) as string[];

  private citySubscription: Subscription;
  private codesSubscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private orderService: OrderService,
    private utilsService: UtilsService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.form.setValue(this.initialFormValue);
    }, 0);
    this.setLoader(true);

    this.currentLanguage = i18next.language as Language;
    this.layoutDirection = this.utilsService.defineLanguageDirection(
      this.currentLanguage
    );
    this.codesSubscription = this.loginService.getPhoneCodesList().subscribe({
      next: (data) => {
        this.codesAndFlags = data;
      },
      error: () => {
        this.setLoader(false), this.openErrorDialog();
      },
    });

    this.citySubscription = this.loginService.getCitiesList().subscribe({
      next: (data) =>
        (this.cities = this.utilsService.formatCityList(
          data,
          this.currentLanguage
        )),
      error: () => {
        this.setLoader(false), this.openErrorDialog();
      },
    });
    this.setLoader(false);
  }

  changeLanguage(event: any) {
    this.currentLanguage = event.target?.name || defaultLanguage;
    i18next.changeLanguage(this.currentLanguage).then(() => {
      document.location.reload();
    });
  }

  setLoader(loaderState: boolean) {
    this.isLoading = loaderState;
  }

  submit(form: NgForm, event: any) {
    event.preventDefault();

    const newOrder = this.utilsService.formatFormToOrder(form.value);

    if (form.invalid) return;

    this.setLoader(true);

    this.orderService.saveOrder(form.value).subscribe({
      next: (data) => {
        this.loginService.markUserAsRegistered();
        this.setLoader(false);
        this.dataService.changeData(data);
        this.router.navigate(['/order-referral']);
      },
      error: () => {
        this.setLoader(false);
        this.openErrorDialog();
      },
    });
  }

  openErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent);
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1?.id === o2?.id;
  }

  ngOnDestroy() {
    this.citySubscription.unsubscribe();
    this.codesSubscription.unsubscribe();
  }
}
