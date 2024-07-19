import {Component} from '@angular/core';
import {ThemesService} from '@services/themes.service';
import {TranslateService} from '@ngx-translate/core';

/**
 * @author Romain Frezier
 * @component
 * @description
 * The root component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * The CSS class for the current theme.
   */
  public themeClass: string;
  /**
   * Flag indicating whether the theme menu is shown.
   */
  public showThemeMenu: boolean;

  /**
   * @constructor
   * @param themesService - Service to manage themes.
   * @param translate - Service to handle translations.
   */
  constructor(
    private themesService: ThemesService,
    private translate: TranslateService,
  ) {
    this.themeClass = '';
    this.showThemeMenu = false;

    // Set the default language to French.
    this.translate.setDefaultLang('fr');

    // Subscribe to theme changes and update the theme class accordingly.
    this.themesService.currentTheme.subscribe(
      (theme) => (this.themeClass = theme),
    );
  }
}
