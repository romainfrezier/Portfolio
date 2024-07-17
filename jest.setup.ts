import 'jest-preset-angular/setup-jest';
import fetchMock from 'jest-fetch-mock';
import {TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {SharedModule} from "@shared/shared.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ThemesService} from "@services/themes.service";
import {DataService} from "@services/data.service";
import {ToastService} from "@services/toast.service";
import {MailService} from "@services/mail.service";
import {AppRoutingModule} from "@app/app-routing.module";

fetchMock.enableMocks();

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      AppRoutingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      SharedModule
    ],
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      ThemesService,
      DataService,
      ToastService,
      MailService
    ]
  }).compileComponents();
});

afterEach((): void => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
})
