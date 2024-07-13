import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';

@Injectable()
export class TranslateServiceMock extends TranslateService {
  override get(key: string): Observable<string> {
    return of(key);
  }
}
