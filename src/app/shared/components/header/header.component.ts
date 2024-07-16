import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {ThemesService} from '@services/themes.service';
import {Observable} from 'rxjs';

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
  public readonly skills: string;

  protected readonly AppConstants = AppConstants;

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

  public hideLanguageMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isLanguageMenuShown = false;
  }

  public hideThemeMenu(event: MouseEvent | Event): void {
    event.stopPropagation();
    this.isThemeMenuShown = false;
  }

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

  public switchLanguage(lang: string): void {
    const htmlTag: HTMLElement | null = document.querySelector('html');
    htmlTag?.setAttribute('lang', lang);
    this.translate.use(lang);
    localStorage.setItem(AppConstants.LOCALSTORAGE.LANGUAGE, lang);
    if (this.isBurgerMenuOpen) {
      this.hideBurgerMenu();
    }
  }

  public switchTheme(theme: string): void {
    this.themesService.changeTheme(theme);
    localStorage.setItem(AppConstants.LOCALSTORAGE.THEME, theme);
    if (this.isBurgerMenuOpen) {
      this.hideBurgerMenu();
    }
  }

  public hideBurgerMenu() {
    this.isBurgerMenuOpen = false;
  }

  public hideWorkMenu(event: MouseEvent | Event) {
    event.stopPropagation();
    this.isBurgerMenuOpen = false;
    this.isWorkMenuShown = false;
  }

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

  public getCurrentTheme(): Observable<string> {
    return this.themesService.currentTheme;
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
