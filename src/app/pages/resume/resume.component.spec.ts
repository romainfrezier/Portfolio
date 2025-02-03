import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ResumeComponent} from './resume.component';
import {TranslateService} from "@ngx-translate/core";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {AppConstants} from "@app/app.constants";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

/**
 * @author Romain Frezier
 * @test
 */
describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
  let translateService: TranslateService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ResumeComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(ResumeComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Business', () => {
    it('should download resume with correct URL and filename', () => {
      const anchor: HTMLAnchorElement = document.createElement('a');
      jest.spyOn(anchor, 'click').mockImplementation(() => {});
      jest.spyOn(anchor, 'remove').mockImplementation(() => {});
      const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(anchor);

      jest.spyOn(translateService, 'use');
      jest.spyOn(translateService, 'currentLang', 'get').mockReturnValue(AppConstants.LANGUAGES.EN);

      component.download_resume();

      const linkElement: HTMLAnchorElement = createElementSpy.mock.results[0].value as HTMLAnchorElement;

      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(linkElement.download).toBe('CV_Romain_Frezier.pdf');
      expect(linkElement.href).toBe('https://api.minio.romainfrezier.com/files/CV_' + AppConstants.LANGUAGES.EN + '.pdf');
      expect(linkElement.click).toHaveBeenCalled();
      expect(linkElement.remove).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('should call download_resume when image is clicked', () => {
      jest.spyOn(component, 'download_resume');
      fixture.detectChanges();
      const imageElement: DebugElement = fixture.debugElement.query(By.css('img'));
      imageElement.triggerEventHandler('click', new MouseEvent('click'));
      fixture.detectChanges();
      expect(component.download_resume).toHaveBeenCalled();
    });

    it('should call download_resume when button is clicked', () => {
      jest.spyOn(component, 'download_resume');
      const buttonElement: DebugElement = fixture.debugElement.query(By.css('button'));
      buttonElement.triggerEventHandler('click', new MouseEvent('click'));
      fixture.detectChanges();
      expect(component.download_resume).toHaveBeenCalled();
    });

    it('should display translated title and subtitle', () => {
      translateService.use(AppConstants.LANGUAGES.EN);
      fixture.detectChanges();
      const titleElement: DebugElement = fixture.debugElement.query(By.css('h1'));
      const subtitleElement: DebugElement = fixture.debugElement.query(By.css('p'));
      expect(titleElement.nativeElement.textContent.trim()).toBe('resume.title');
      expect(subtitleElement.nativeElement.textContent.trim()).toBe('resume.subtitle');
    });

    it('should have correct attributes on img element', () => {
      const imgElement: DebugElement = fixture.debugElement.query(By.css('img'));
      expect(imgElement.nativeElement.getAttribute('src')).toBe('resume.preview');
      expect(imgElement.nativeElement.getAttribute('alt')).toBe('resume_preview');
    });

    it('should have correct attributes on button element', () => {
      const buttonElement: DebugElement = fixture.debugElement.query(By.css('button'));
      const pElement = buttonElement.nativeElement.querySelector('p');
      expect(pElement.textContent.trim()).toBe('resume.download');
    });
  });
});
