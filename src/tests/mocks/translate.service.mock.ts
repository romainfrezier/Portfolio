import {Observable, of} from 'rxjs';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {AppConstants} from "@app/app.constants";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Mock service for testing purposes, extending the TranslateService to provide mock data.
 */
@Injectable()
export class TranslateServiceMock extends TranslateService {
  private currentLanguage: string | undefined;
  override get(key: string): Observable<string> {
    return of(key);
  }

  override use(lang: string): Observable<string> {
    const langEvent: LangChangeEvent = {
      lang: lang,
      translations: {}
    };
    super.onLangChange.emit(langEvent);
    this.currentLanguage = lang;
    return of(lang);
  }

  override get currentLang(): string {
    return this.currentLanguage ?? AppConstants.LANGUAGES.EN;
  }


  override set currentLang(currentLang: string) {
    this.currentLanguage = currentLang;
  }
}
