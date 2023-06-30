import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppConstants} from "@app/app.constants";

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  private theme: BehaviorSubject<string>;
  public currentTheme: Observable<string>;

  constructor() {
    const savedTheme: string | null = localStorage.getItem(AppConstants.LOCALSTORAGE.THEME);
    if (savedTheme) {
      this.theme = new BehaviorSubject<string>(savedTheme)
    } else {
      this.theme = new BehaviorSubject('dark-theme');
    }
    this.currentTheme = this.theme.asObservable()
  }

  changeTheme(theme: string) {
    this.theme.next(theme);
    localStorage.setItem(AppConstants.LOCALSTORAGE.THEME, theme)
  }
}
