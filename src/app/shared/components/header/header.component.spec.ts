import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {ThemesService} from '@services/themes.service';
import {HeaderComponent} from './header.component';
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {ThemesServiceMock} from "@tests/mocks/themes.service.mock";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let themesService: ThemesService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        {provide: ThemesService, useClass: ThemesServiceMock},
        {provide: TranslateService, useClass: TranslateServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach((): void  => {
    jest.clearAllMocks();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    themesService = TestBed.inject(ThemesService);
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.isLanguageMenuShown).toBe(false);
      expect(component.isThemeMenuShown).toBe(false);
      expect(component.isBurgerMenuOpen).toBe(false);
      expect(component.isWorkMenuShown).toBe(false);
    });
  });

  describe('Template', () => {
    it('should render menu burger icon', () => {
      const burgerMenu: DebugElement = fixture.debugElement.query(By.css('.menu-burger'));
      expect(burgerMenu.nativeElement.textContent.trim()).toBe('☰');
    });

    it('should update burger menu icon when clicked', () => {
      const burgerMenu: DebugElement = fixture.debugElement.query(By.css('.menu-burger'));
      burgerMenu.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(burgerMenu.nativeElement.textContent.trim()).toBe('✖');
    });

    it('should toggle burger menu visibility', () => {
      const navMenu: DebugElement = fixture.debugElement.query(By.css('.menu-items'));
      expect(navMenu.classes['menu-close']).toBe(true)
      component.toggleBurgerMenu();
      fixture.detectChanges();
      expect(navMenu.classes['menu-open']).toBe(true)
    });

    it('should render header items', () => {
      const headerItems: DebugElement[] = fixture.debugElement.queryAll(By.css('.header-item'));
      expect(headerItems.length).toBeGreaterThan(0);
    });

    it('should toggle language menu visibility', () => {
      const languageMenuToggle: DebugElement = fixture.debugElement.query(By.css('.header-item:nth-child(8)'));
      languageMenuToggle.triggerEventHandler('click', new MouseEvent('click'));
      fixture.detectChanges();
      const languageMenu: DebugElement = fixture.debugElement.query(By.css('.language-menu'));
      expect(languageMenu).toBeTruthy();
    });

    it('should render translated text', () => {
      const headerItem: DebugElement = fixture.debugElement.query(By.css('.header-item'));
      expect(headerItem.nativeElement.textContent.trim()).toBe('header.home');
    });
  });

  describe('Interaction', () => {
    it('should toggle language menu', () => {
      component.toggleLanguageMenu(new MouseEvent('click'));
      expect(component.isLanguageMenuShown).toBe(true);
      component.toggleLanguageMenu(new MouseEvent('click'));
      expect(component.isLanguageMenuShown).toBe(false);
    });

    it('should toggle theme menu', () => {
      component.toggleThemeMenu(new MouseEvent('click'));
      expect(component.isThemeMenuShown).toBe(true);
      component.toggleThemeMenu(new MouseEvent('click'));
      expect(component.isThemeMenuShown).toBe(false);
    });

    it('should toggle work menu', () => {
      component.toggleWorkMenu(new MouseEvent('click'));
      expect(component.isWorkMenuShown).toBe(true);
      component.toggleWorkMenu(new MouseEvent('click'));
      expect(component.isWorkMenuShown).toBe(false);
    });

    it('should switch language', () => {
      jest.spyOn(translateService, 'use');
      component.switchLanguage(AppConstants.LANGUAGES.FR);
      expect(translateService.use).toHaveBeenCalledWith(AppConstants.LANGUAGES.FR);
      expect(localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE)).toBe(AppConstants.LANGUAGES.FR);
    });

    it('should switch theme', () => {
      jest.spyOn(themesService, 'changeTheme');
      component.switchTheme(AppConstants.THEMES.DARK);
      expect(themesService.changeTheme).toHaveBeenCalledWith(AppConstants.THEMES.DARK);
      expect(localStorage.getItem(AppConstants.LOCALSTORAGE.THEME)).toBe(AppConstants.THEMES.DARK);
    });

    it('should toggle burger menu', () => {
      component.toggleBurgerMenu();
      expect(component.isBurgerMenuOpen).toBe(true);
      component.toggleBurgerMenu();
      expect(component.isBurgerMenuOpen).toBe(false);
    });

    it('should get current theme', (done) => {
      themesService.changeTheme(AppConstants.THEMES.LIGHT)
      component.getCurrentTheme().subscribe(theme => {
        expect(theme).toBe(AppConstants.THEMES.LIGHT);
        done();
      });
    });

    it('should get current language', () => {
      translateService.use(AppConstants.LANGUAGES.EN)
      expect(component.getCurrentLanguage()).toBe(AppConstants.LANGUAGES.EN);
    });
  });
});
