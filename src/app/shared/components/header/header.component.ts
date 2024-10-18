import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {ThemesService} from '@services/themes.service';
import {Observable} from 'rxjs';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays the header with the menu
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isLanguageMenuShown: boolean;
  public isThemeMenuShown: boolean;
  public isWorkMenuShown: boolean;
  public isBurgerMenuOpen: boolean;

  public readonly home: string;
  public readonly about: string;
  public readonly resume: string;
  public readonly achievements: string;
  public schoolProjects: string;
  public workExperience: string;
  public education: string;
  public readonly skills: string;

  protected readonly AppConstants = AppConstants;

  /**
   * @constructor
   * @param translate - Service to handle translations.
   * @param themesService - Service to manage themes.
   */
  constructor(
    private translate: TranslateService,
    private themesService: ThemesService,
  ) {
    this.home = AppConstants.ROUTES.HOME;
    this.about = AppConstants.ROUTES.ABOUT;
    this.resume = AppConstants.ROUTES.RESUME;
    this.achievements = AppConstants.ROUTES.ACHIEVEMENTS;
    this.schoolProjects =
      AppConstants.ROUTES.WORK + '/' + AppConstants.ROUTES.SCHOOL_PROJECTS;
    this.workExperience =
      AppConstants.ROUTES.WORK + '/' + AppConstants.ROUTES.EXPERIENCES;
    this.education =
      AppConstants.ROUTES.WORK + '/' + AppConstants.ROUTES.EDUCATION;
    this.skills = AppConstants.ROUTES.SKILLS;
    const language: string | null = localStorage.getItem(
      AppConstants.LOCALSTORAGE.LANGUAGE,
    );
    if (language) {
      this.switchLanguage(language);
    } else {
      this.translate.currentLang = this.translate.defaultLang;
      localStorage.setItem(
        AppConstants.LOCALSTORAGE.LANGUAGE,
        this.translate.currentLang,
      );
    }
    this.isLanguageMenuShown = false;
    this.isThemeMenuShown = false;
    this.isBurgerMenuOpen = false;
    this.isWorkMenuShown = false;
  }

  /**
   * Hides the language menu.
   * @param event - The mouse event.
   */
  public hideLanguageMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isLanguageMenuShown = false;
  }

  /**
   * Hides the theme menu.
   * @param event - The mouse event.
   */
  public hideThemeMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isThemeMenuShown = false;
  }

  /**
   * Toggles the visibility of the language menu.
   * @param event - The mouse event.
   */
  public toggleLanguageMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isLanguageMenuShown = !this.isLanguageMenuShown;
    if (this.isThemeMenuShown && this.isLanguageMenuShown) {
      this.isThemeMenuShown = false;
    }
    if (this.isWorkMenuShown && this.isLanguageMenuShown) {
      this.isWorkMenuShown = false;
    }
    if (this.isLanguageMenuShown) {
      document.addEventListener(
        'click',
        () => {
          this.isLanguageMenuShown = false;
        },
        { once: true },
      );
    }
  }

  /**
   * Toggles the visibility of the theme menu.
   * @param event - The mouse event.
   */
  public toggleThemeMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isThemeMenuShown = !this.isThemeMenuShown;
    if (this.isLanguageMenuShown && this.isThemeMenuShown) {
      this.isLanguageMenuShown = false;
    }
    if (this.isWorkMenuShown && this.isThemeMenuShown) {
      this.isWorkMenuShown = false;
    }
    if (this.isThemeMenuShown) {
      document.addEventListener(
        'click',
        () => {
          this.isThemeMenuShown = false;
        },
        { once: true },
      );
    }
  }

  /**
   * Toggles the visibility of the work menu.
   * @param event - The mouse event.
   */
  public toggleWorkMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isWorkMenuShown = !this.isWorkMenuShown;
    if (this.isThemeMenuShown && this.isWorkMenuShown) {
      this.isThemeMenuShown = false;
    }
    if (this.isWorkMenuShown && this.isLanguageMenuShown) {
      this.isLanguageMenuShown = false;
    }
    if (this.isWorkMenuShown) {
      document.addEventListener(
        'click',
        () => {
          this.isWorkMenuShown = false;
        },
        { once: true },
      );
    }
  }

  /**
   * Switches the language of the application.
   * @param lang - The language code to switch to.
   */
  public switchLanguage(lang: string): void {
    const htmlTag: HTMLElement | null = document.querySelector('html');
    htmlTag?.setAttribute('lang', lang);
    this.translate.use(lang);
    localStorage.setItem(AppConstants.LOCALSTORAGE.LANGUAGE, lang);
    if (this.isBurgerMenuOpen) {
      this.hideBurgerMenu();
    }
  }

  /**
   * Switches the theme of the application.
   * @param theme - The theme to switch to.
   */
  public switchTheme(theme: string): void {
    this.themesService.changeTheme(theme);
    localStorage.setItem(AppConstants.LOCALSTORAGE.THEME, theme);
    if (this.isBurgerMenuOpen) {
      this.hideBurgerMenu();
    }
  }

  /**
   * Hides the burger menu.
   */
  public hideBurgerMenu() {
    this.isBurgerMenuOpen = false;
  }

  /**
   * Hides the work menu.
   * @param event - The mouse event.
   */
  public hideWorkMenu(event: MouseEvent | Event) {
    event.stopPropagation();
    this.isBurgerMenuOpen = false;
    this.isWorkMenuShown = false;
  }

  /**
   * Toggles the visibility of the burger menu.
   */
  public toggleBurgerMenu() {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
    if (this.isBurgerMenuOpen) {
      document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.menu-burger')) {
          this.isBurgerMenuOpen = false;
        }
      });
    }
  }

  /**
   * Gets the current theme.
   * @returns An observable of the current theme.
   */
  public getCurrentTheme(): Observable<string> {
    return this.themesService.currentTheme;
  }

  /**
   * Gets the current language.
   * @returns The current language code.
   */
  public getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
