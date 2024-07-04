export class AppConstants {
  static LOCALSTORAGE = class {
    public static THEME = "theme"
    public static LAST_PAGE = "last-page"
    public static LANGUAGE = "language"
  }
  static ROUTES = class {
    public static HOME = "home"
    public static ABOUT = "about"
    public static WORK = "work"
    public static ACHIEVEMENTS = "achievements"
    public static RESUME = "resume"
    public static SKILLS = "skills"
    public static ERROR = "error"

    public static SCHOOL_PROJECTS = "school-projects"
    public static EXPERIENCES = "experiences"
    public static _404 = "404"

    public static ERROR_404 = this.ERROR + "/" + this._404
  }

  static THEMES = class {
    public static DARK = "dark-theme"
    public static BLACK = "black-theme"
    public static LIGHT = "light-theme"
    public static DYNAMIC = "dynamic-theme"
  }

  static LANGUAGES = class {
    public static EN = "en"
    public static FR = "fr"
  }
}
