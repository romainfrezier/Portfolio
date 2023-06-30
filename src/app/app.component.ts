import {Component, OnInit} from '@angular/core';
import {ThemesService} from "@services/themes.service";
import {TranslateService} from "@ngx-translate/core";
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public themeClass: string;
  public showThemeMenu: boolean;

  ngOnInit(): void {
    const glass: HTMLElement = document.querySelector(".glass")!;
    VanillaTilt.init(glass, {
      max: 1,
      speed: 50,
    });

  }

  constructor(private themesService: ThemesService, private translate: TranslateService) {
    this.themeClass = '';
    this.showThemeMenu = false;
    this.translate.setDefaultLang('fr');
    this.themesService.currentTheme.subscribe(theme => this.themeClass = theme);
  }

  public switchTheme(theme: string) {
    this.themesService.changeTheme(theme);
  }
}
