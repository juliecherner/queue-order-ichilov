import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { t } from 'i18next';
import { DataService } from '../../services/data/data.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { CustomDate } from '../../types';
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
  private dataSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.dataSubscription = this.dataService.getData().subscribe((data) => {
      this.fullName = data.firstName + ' ' + data.lastName;
      this.reason = data.reason;
    });

    this.date = this.utilsService.generateTimeAndDate();
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
