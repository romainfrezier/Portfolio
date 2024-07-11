export class AppConstants {
  public static readonly LOCALSTORAGE = class {
    public static readonly THEME = 'theme';
    public static readonly LAST_PAGE = 'last-page';
    public static readonly LANGUAGE = 'language';
  };
  public static readonly ROUTES = class {
    public static readonly HOME = 'home';
    public static readonly ABOUT = 'about';
    public static readonly WORK = 'work';
    public static readonly ACHIEVEMENTS = 'achievements';
    public static readonly RESUME = 'resume';
    public static readonly SKILLS = 'skills';
    public static readonly ERROR = 'error';

    public static readonly SCHOOL_PROJECTS = 'school-projects';
    public static readonly EXPERIENCES = 'experiences';
    public static readonly _404 = '404';

    public static readonly ERROR_404 = this.ERROR + '/' + this._404;
  };

  public static readonly THEMES = class {
    public static readonly DARK = 'dark-theme';
    public static readonly BLACK = 'black-theme';
    public static readonly LIGHT = 'light-theme';
    public static readonly DYNAMIC = 'dynamic-theme';
  };

  public static readonly LANGUAGES = class {
    public static readonly EN = 'en';
    public static readonly FR = 'fr';
  };

  public static readonly TOAST = class {
    public static readonly TYPES = class {
      public static readonly SUCCESS = 'success';
      public static readonly ERROR = 'error';
      public static readonly INFO = 'info';
    }
    public static readonly DELAY = 3000;
  }
}
