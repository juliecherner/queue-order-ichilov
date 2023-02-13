import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReferralComponent } from '../components/order-referral/order-referral.component';
import { RegistrationFormComponent } from '../components/registration-form/registration-form.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { GuardService } from '../services/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registration',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    component: RegistrationFormComponent,
  },
  {
    path: 'order-referral',
    component: OrderReferralComponent,
    canActivate: [GuardService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
