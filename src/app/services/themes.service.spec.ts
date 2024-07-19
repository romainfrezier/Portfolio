import {TestBed} from '@angular/core/testing';
import {ThemesService} from './themes.service';
import {AppConstants} from '@app/app.constants';
import {MockLocalStorage} from '@tests/mocks/local-storage.mock';
import {Observable} from "rxjs";

/**
 * @author Romain Frezier
 * @test
 */
describe('ThemesService', () => {
  let service: ThemesService;
  let mockLocalStorage: MockLocalStorage;

  beforeEach(() => {
    mockLocalStorage = new MockLocalStorage();
    Object.defineProperty(window, 'localStorage', {value: mockLocalStorage});

    TestBed.configureTestingModule({
      providers: [ThemesService]
    });
    service = TestBed.inject(ThemesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with saved theme from localStorage', () => {
    mockLocalStorage.setItem(AppConstants.LOCALSTORAGE.THEME, AppConstants.THEMES.LIGHT);
    const newService: ThemesService = new ThemesService();
    expect(newService.currentTheme).toBeInstanceOf(Observable);
    newService.currentTheme.subscribe(theme => {
      expect(theme).toBe(AppConstants.THEMES.LIGHT);
    });
  });

  it('should initialize with default theme if no theme is saved', () => {
    mockLocalStorage.removeItem(AppConstants.LOCALSTORAGE.THEME);
    const newService: ThemesService = new ThemesService();
    expect(newService.currentTheme).toBeInstanceOf(Observable);
    newService.currentTheme.subscribe(theme => {
      expect(theme).toBe(AppConstants.THEMES.DARK);
    });
  });

  it('should change theme and update localStorage', () => {
    service.changeTheme(AppConstants.THEMES.LIGHT);
    expect(mockLocalStorage.getItem(AppConstants.LOCALSTORAGE.THEME)).toBe(AppConstants.THEMES.LIGHT);

    service.currentTheme.subscribe(theme => {
      expect(theme).toBe(AppConstants.THEMES.LIGHT);
    });
  });

  it('should set the HTML body tag class when theme is changed', () => {
    const bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
    service.changeTheme(AppConstants.THEMES.LIGHT);
    expect(bodyTag.className).toBe('html-' + AppConstants.THEMES.LIGHT);

    service.changeTheme(AppConstants.THEMES.DARK);
    expect(bodyTag.className).toBe('html-' + AppConstants.THEMES.DARK);
  });
});
