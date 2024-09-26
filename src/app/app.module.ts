import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ThemesService} from '@services/themes.service';
import {DataService} from '@services/data.service';
import {SharedModule} from '@shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {ToastService} from "@services/toast.service";
import {MailService} from "@services/mail.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {firebaseConfig} from "@app/firebase.config";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule
  ],
  providers: [ThemesService, DataService, ToastService, MailService, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {
}
