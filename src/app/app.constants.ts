export class AppConstants {
  static LOCALSTORAGE = class {
    public static THEME = "theme"
    public static LAST_PAGE = "last-page"
    public static LANGUAGE = "language"
  }
  static ROUTES = class {
    public static HOME = "home"
    public static ABOUT = "about"
    public static PROJECTS = "projects"
    public static ACHIEVEMENTS = "achievements"
    public static RESUME = "resume"
    public static SKILLS = "skills"
    public static ERROR = "error"
    public static _404 = "404"

    public static ERROR_404 = this.ERROR + "/" + this._404
  }
}
