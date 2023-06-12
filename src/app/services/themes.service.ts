import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private theme = new BehaviorSubject('vibrant-theme');
  currentTheme = this.theme.asObservable();

  changeTheme(theme: string) {
    this.theme.next(theme);
  }
}
