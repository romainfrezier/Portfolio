import { Component, EventEmitter, Output } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() sectionChanged = new EventEmitter<number>();

  public activeSectionIndex: number;
  public showLanguageMenu: boolean;
  public emoji: string;
  public isBurgerMenuOpen: boolean;

  constructor(private translate: TranslateService) {
    this.activeSectionIndex = 0;
    this.emoji = '👋';
    this.showLanguageMenu = false;
    this.isBurgerMenuOpen = false;
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
  }

  public getHeaderItemClasses(index: number): string {
    return `header-item ${this.activeSectionIndex === index ? 'active' : ''}`;
  }

  public toggleLanguageMenu(): void {
    console.log(this.showLanguageMenu);
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  public toggleMenu() {
    this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
    this.showLanguageMenu = false;
  }
}
