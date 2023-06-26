import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConstants} from "@app/app.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public showLanguageMenu: boolean;
  public emoji: string;
  public isBurgerMenuOpen: boolean;

  public readonly home: string;
  public readonly about: string;
  public readonly resume: string;
  public readonly achievements: string;
  public readonly projects: string;
  public readonly skills: string;

  constructor(private translate: TranslateService) {
    this.home = AppConstants.ROUTES.HOME;
    this.about = AppConstants.ROUTES.ABOUT;
    this.resume = AppConstants.ROUTES.RESUME;
    this.achievements = AppConstants.ROUTES.ACHIEVEMENTS;
    this.projects = AppConstants.ROUTES.PROJECTS;
    this.skills = AppConstants.ROUTES.SKILLS;
    const language: string | null = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE);
    if (language) {
      this.switchLanguage(language)
    }
    this.emoji = '👋';
    this.showLanguageMenu = false;
    this.isBurgerMenuOpen = false;
  }

  public setActiveSection(index: number): void {
    switch (index) {
      case 0:
        this.emoji = '👋';
        break;
      case 1:
        this.emoji = '😁';
        break;
      case 2:
        this.emoji = '📄';
        break;
      case 3:
        this.emoji = '🏆';
        break;
      case 4:
        this.emoji = '🧑‍💻';
        break;
      case 5:
        this.emoji = '⚙️';
        break;
      default:
        this.emoji = '👋';
    }
    this.isBurgerMenuOpen = false;
    this.showLanguageMenu = false;
    localStorage.setItem(AppConstants.LOCALSTORAGE.LAST_PAGE, index.toString())
  }

  public toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(AppConstants.LOCALSTORAGE.LANGUAGE, lang)
    if (this.isBurgerMenuOpen) {
      this.toggleMenu();
    }
  }

  public toggleMenu() {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
  }
}
