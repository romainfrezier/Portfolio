import {Component} from '@angular/core';
import {ThemesService} from '@services/themes.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public themeClass: string;
  public showThemeMenu: boolean;

  constructor(
    private themesService: ThemesService,
    private translate: TranslateService,
  ) {
    this.themeClass = '';
    this.showThemeMenu = false;
    this.translate.setDefaultLang('fr');
    this.themesService.currentTheme.subscribe(
      (theme) => (this.themeClass = theme),
    );
  }
}
