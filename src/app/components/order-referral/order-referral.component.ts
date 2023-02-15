import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import i18next, { t } from 'i18next';
import { DataService } from '../../services/data/data.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { CustomDate, LayoutDirection, Language } from '../../types';
import './order-referral.component';

@Component({
  selector: 'app-order-referral',
  templateUrl: './order-referral.component.html',
  styleUrls: ['./order-referral.component.scss'],
})
export class OrderReferralComponent {
  readonly instrustions = t('order.instrustions', {
    returnObjects: true,
  }) as string[];

  fullName: string;
  reason: string;
  date: CustomDate;
  layoutDirection: LayoutDirection = 'ltr';
  private dataSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const currentLanguage = i18next.language as Language;
    this.layoutDirection =
      this.utilsService.defineLanguageDirection(currentLanguage);
    this.date = this.utilsService.generateTimeAndDate();
    console.log('currentLanguage', currentLanguage);
    this.dataSubscription = this.dataService.getData().subscribe((data) => {
      this.fullName = data.firstName + ' ' + data.lastName;
      this.reason = data.reason;
    });
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
