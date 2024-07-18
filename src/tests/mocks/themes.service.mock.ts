import {Injectable} from '@angular/core';
import {ThemesService} from "@services/themes.service";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Mock service for testing purposes, extending the ThemesService to provide mock data.
 */
@Injectable()
export class ThemesServiceMock extends ThemesService {
  override changeTheme(theme: string) {
    super.changeTheme(theme);
  }

  override setHTMLTagTheme(theme: string) {
    super.setHTMLTagTheme(theme);
  }
}
