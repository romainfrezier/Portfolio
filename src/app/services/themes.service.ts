import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppConstants} from '@app/app.constants';

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for managing and applying themes in the application.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  /**
   * BehaviorSubject to hold the current theme value.
   */
  private theme: BehaviorSubject<string>;
  /**
   * Observable to expose the current theme value.
   */
  public currentTheme: Observable<string>;

  /**
   * @constructor
   * Initializes the theme based on saved preference or defaults to dark theme.
   */
  constructor() {
    const savedTheme: string | null = localStorage.getItem(
      AppConstants.LOCALSTORAGE.THEME,
    );
    if (savedTheme) {
      this.theme = new BehaviorSubject<string>(savedTheme);
    } else {
      this.theme = new BehaviorSubject(AppConstants.THEMES.DARK);
    }
    this.currentTheme = this.theme.asObservable();
    this.setHTMLTagTheme(this.theme.getValue());
  }

  /**
   * Changes the current theme and updates the local storage and HTML body class.
   * @param theme - The new theme to be applied.
   */
  public changeTheme(theme: string) {
    this.theme.next(theme);
    localStorage.setItem(AppConstants.LOCALSTORAGE.THEME, theme);
    console.log(typeof localStorage);
    console.log(localStorage);
    this.setHTMLTagTheme(theme);
  }

  /**
   * Sets the theme class on the HTML body tag to apply the theme.
   * @param theme - The theme to be applied.
   */
  public setHTMLTagTheme(theme: string) {
    const bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    bodyTag.className = 'html-' + theme;
  }
}
