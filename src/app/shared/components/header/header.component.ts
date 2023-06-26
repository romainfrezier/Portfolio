import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppConstants} from "@app/app.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sectionChanged: EventEmitter<number>;

  @Input() public activeSectionIndex!: number;

  public showLanguageMenu: boolean;
  public emoji: string;
  public isBurgerMenuOpen: boolean;

  constructor(private translate: TranslateService) {
    this.sectionChanged = new EventEmitter<number>();
    const language: string | null = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE);
    if (language) {
      this.switchLanguage(language)
    }
    this.emoji = '👋';
    this.showLanguageMenu = false;
    this.isBurgerMenuOpen = false;
  }

  ngOnInit(): void {
    this.setActiveSection(this.activeSectionIndex);
  }

  public setActiveSection(index: number): void {
    this.activeSectionIndex = index;
    this.sectionChanged.emit(index);
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

  public getHeaderItemClasses(index: number): string {
    return `header-item ${this.activeSectionIndex === index ? 'active' : ''}`;
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
