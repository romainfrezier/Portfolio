import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConstants} from "@app/app.constants";
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isLanguageMenuShown: boolean;
  public emoji: string;
  public isBurgerMenuOpen: boolean;

  public readonly home: string;
  public readonly about: string;
  public readonly resume: string;
  public readonly achievements: string;
  public readonly work: string;
  public readonly skills: string;

  constructor(private translate: TranslateService, private location: Location) {
    this.home = AppConstants.ROUTES.HOME;
    this.about = AppConstants.ROUTES.ABOUT;
    this.resume = AppConstants.ROUTES.RESUME;
    this.achievements = AppConstants.ROUTES.ACHIEVEMENTS;
    this.work = AppConstants.ROUTES.WORK;
    this.skills = AppConstants.ROUTES.SKILLS;
    const language: string | null = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE);
    if (language) {
      this.switchLanguage(language)
    } else {
      this.translate.currentLang = this.translate.defaultLang;
      localStorage.setItem(AppConstants.LOCALSTORAGE.LANGUAGE, this.translate.currentLang);
    }
    this.emoji = '👋';
    this.isLanguageMenuShown = false;
    this.isBurgerMenuOpen = false;
    this.location.onUrlChange((url: string) => {
      const pathSections: string[] = url.split('/');
      const path: string = pathSections[pathSections.length - 1];
      this.setEmoji(path);
    });
  }

  public setEmoji(path: string): void {
    if (path == this.home) {
      this.emoji = '👋';
    } else if (path == this.about) {
      this.emoji = '😁';
    } else if (path == this.resume) {
      this.emoji = '📄';
    } else if (path == this.achievements) {
      this.emoji = '🏆';
    } else if (path == this.work) {
      this.emoji = '🧑‍💻';
    } else if (path == this.skills) {
      this.emoji = '⚙️';
    } else if (path == AppConstants.ROUTES.SCHOOL_PROJECTS) {
      this.emoji = '🎓';
    } else if (path == AppConstants.ROUTES.EXPERIENCES) {
      this.emoji = '💼';
    } else {
      this.emoji = '❓';
    }
  }

  public hideLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isLanguageMenuShown = false;
  }

  public toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isLanguageMenuShown = !this.isLanguageMenuShown;
  }

  public switchLanguage(lang: string): void {
    const htmlTag: HTMLElement = document.querySelector('html')!;
    htmlTag.setAttribute('lang', lang);
    this.translate.use(lang);
    localStorage.setItem(AppConstants.LOCALSTORAGE.LANGUAGE, lang)
    if (this.isBurgerMenuOpen) {
      this.hideBurgerMenu();
    }
  }

  public hideBurgerMenu() {
    this.isBurgerMenuOpen = false;
  }

  public toggleBurgerMenu() {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  }
}
