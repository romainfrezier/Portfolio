import {Component, OnInit} from '@angular/core';
import {ThemesService} from "./services/themes.service";
import {TranslateService} from "@ngx-translate/core";
import VanillaTilt from "vanilla-tilt";
import {AppConstants} from "./app.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public themeClass: string;
  public showThemeMenu: boolean;
  public activePage: number;

  ngOnInit(): void {
    const glass: HTMLElement = document.querySelector(".glass")!;
    VanillaTilt.init(glass, {
      max: 1,
      speed: 50,
    });

  }

  constructor(private themesService: ThemesService, private translate: TranslateService) {
    const lastPage: string | null = localStorage.getItem(AppConstants.LOCALSTORAGE.LAST_PAGE)
    if (lastPage) {
      this.activePage = +lastPage;
    } else {
      this.activePage = 0;
    }
    this.themeClass = '';
    this.showThemeMenu = false;
    this.translate.setDefaultLang('fr');
    this.themesService.currentTheme.subscribe(theme => this.themeClass = theme);
  }

  public switchTheme(theme: string) {
    this.themesService.changeTheme(theme);
  }

  public toggleThemeMenu(): void {
    this.showThemeMenu = !this.showThemeMenu;
  }

  public setActivePage(pageIndex: number) {
    this.activePage = pageIndex;
  }
}
