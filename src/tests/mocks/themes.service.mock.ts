import {Injectable} from '@angular/core';
import {ThemesService} from "@services/themes.service";

@Injectable()
export class ThemesServiceMock extends ThemesService {
  override changeTheme(theme: string) {
    super.changeTheme(theme);
  }

  override setHTMLTagTheme(theme: string) {
    super.setHTMLTagTheme(theme);
  }
}
