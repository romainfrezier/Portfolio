import {Observable, of} from 'rxjs';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Injectable} from '@angular/core';

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
    return this.currentLanguage ?? 'en';
  }


  override set currentLang(currentLang: string) {
    this.currentLanguage = currentLang;
  }
}
