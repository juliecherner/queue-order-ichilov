import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routes/app-routing.module';
import { FormsModule } from '@angular/forms';
import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from './module-definition/i18next';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { OrderReferralComponent } from './components/order-referral/order-referral.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginService } from './services/login/login.service';
import { DataService } from './services/data/data.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PhoneNumberMaskPipe } from './pipes/phone-number-mask.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    OrderReferralComponent,
    NotFoundComponent,
    LoaderComponent,
    ErrorDialogComponent,
    PhoneNumberMaskPipe,
  ],
  entryComponents: [ErrorDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    I18NextModule.forRoot(),
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [I18N_PROVIDERS, LoginService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
