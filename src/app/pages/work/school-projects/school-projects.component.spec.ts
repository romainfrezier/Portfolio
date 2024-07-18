import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {SchoolProjectsComponent} from './school-projects.component';
import {DataService} from '@services/data.service';
import {DataServiceMock} from '@tests/mocks/data.service.mock';
import {TranslateServiceMock} from '@tests/mocks/translate.service.mock';
import {fakeArchivedProjects, fakeSchoolProjects} from "@tests/fake.data";
import {AppConstants} from "@app/app.constants";
import {By} from "@angular/platform-browser";

describe('SchoolProjectsComponent', () => {
  let component: SchoolProjectsComponent;
  let fixture: ComponentFixture<SchoolProjectsComponent>;
  let dataService: DataService;
  let translateService: TranslateService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [SchoolProjectsComponent],
      providers: [
        {provide: DataService, useClass: DataServiceMock},
        {provide: TranslateService, useClass: TranslateServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SchoolProjectsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch projects on init', () => {
      jest.spyOn(component, 'fetchProjects');
      component.ngOnInit();
      translateService.use(AppConstants.LANGUAGES.FR)
      translateService.use(AppConstants.LANGUAGES.EN)
      expect(component.fetchProjects).toHaveBeenCalledWith(AppConstants.LANGUAGES.EN);
    });

    it('should call seeMoreProjects if showArchivedProjects is true', () => {
      jest.spyOn(component, 'fetchProjects');
      jest.spyOn(component, 'seeMoreProjects');
      component.showArchivedProjects = true;
      component.ngOnInit();
      translateService.use(AppConstants.LANGUAGES.FR)
      translateService.use(AppConstants.LANGUAGES.EN)
      expect(component.seeMoreProjects).toHaveBeenCalled();
    });
  });

  describe('Business', () => {
    it('should fetch projects and set isLoading correctly', () => {
      jest.spyOn(dataService, 'getSchoolProjects');
      component.showArchivedProjects = false;
      component.fetchProjects(AppConstants.LANGUAGES.EN);
      expect(dataService.getSchoolProjects).toHaveBeenCalledWith(AppConstants.LANGUAGES.EN);
      expect(component.projects).toEqual(fakeSchoolProjects);
    });

    it('should load videos after fetching projects', () => {
      jest.spyOn(dataService, 'getSchoolProjects');
      component.showArchivedProjects = false;
      component.fetchProjects(AppConstants.LANGUAGES.EN);
      component.areLoading.forEach((isLoading: boolean) => expect(isLoading).toBe(true));
    });

    it('should fetch and append archived projects', () => {
      jest.spyOn(dataService, 'getArchivedProjects');
      component.projects = fakeSchoolProjects;
      component.seeMoreProjects();
      expect(dataService.getArchivedProjects).toHaveBeenCalledWith(translateService.defaultLang);
      expect(component.projects).toEqual([...fakeSchoolProjects, ...fakeArchivedProjects]);
      expect(component.areLoading.length).toBe(fakeSchoolProjects.length + fakeArchivedProjects.length);
    });

    it('should remove archived projects from the list', () => {
      jest.spyOn(dataService, 'getArchivedProjects');
      component.projects = [...fakeSchoolProjects, ...fakeArchivedProjects];
      component.seeLessProjects();
      expect(dataService.getArchivedProjects).toHaveBeenCalledWith(translateService.defaultLang);
      expect(component.projects).toEqual(fakeSchoolProjects);
      expect(component.showArchivedProjects).toBe(false);
    });

    it('should refetch projects on language change', () => {
      const langEvent: LangChangeEvent = { lang: 'fr', translations: {} };
      jest.spyOn(component, 'fetchProjects');
      translateService.onLangChange.emit(langEvent);
      expect(component.fetchProjects).toHaveBeenCalledWith('fr');
    });
  });

  describe('Template', () => {
    it('should display project titles', () => {
      component.projects = fakeSchoolProjects;
      fixture.detectChanges();
      const projectItems = fixture.debugElement.queryAll(By.css('.project-item h2'));
      expect(projectItems.length).toBe(fakeSchoolProjects.length);
      projectItems.forEach((item, index) => {
        expect(item.nativeElement.textContent.trim()).toBe(fakeSchoolProjects[index].name);
      });
    });

    it('should display "See more" button if not showing archived projects', () => {
      component.showArchivedProjects = false;
      fixture.detectChanges();
      const seeMoreButton = fixture.debugElement.query(By.css('.button-container'));
      expect(seeMoreButton.nativeElement.textContent.trim()).toBe('school_projects.see-more');
    });

    it('should display "See less" button if showing archived projects', () => {
      component.showArchivedProjects = true;
      fixture.detectChanges();
      const seeLessButton = fixture.debugElement.query(By.css('.button-container'));
      expect(seeLessButton.nativeElement.textContent.trim()).toBe('school_projects.see-less');
    });

    it('should display project details', () => {
      component.projects = fakeSchoolProjects;
      fixture.detectChanges();
      const projectItems = fixture.debugElement.queryAll(By.css('.project-item'));
      projectItems.forEach((item, index) => {
        const project = fakeSchoolProjects[index];
        expect(item.query(By.css('h2')).nativeElement.textContent.trim()).toBe(project.name);
        expect(item.query(By.css('p:nth-child(2)')).nativeElement.textContent.trim()).toContain(project.date);
        expect(item.query(By.css('p:nth-child(3)')).nativeElement.textContent.trim()).toContain(project.languages);
        expect(item.query(By.css('p:nth-child(4)')).nativeElement.textContent.trim()).toContain(project.number.toString());
        expect(item.query(By.css('p:nth-child(5)')).nativeElement.textContent.trim()).toBe(project.description);
      });
    });

    it('should show a loader while videos are loading', () => {
      component.projects = fakeSchoolProjects;
      component.areLoading = new Array(fakeSchoolProjects.length).fill(true);
      fixture.detectChanges();
      const loaders = fixture.debugElement.queryAll(By.css('app-loader'));
      expect(loaders.length).toBe(fakeSchoolProjects.length);
    });

    it('should show iframe when videos are loaded', () => {
      component.projects = fakeSchoolProjects;
      component.areLoading = new Array(fakeSchoolProjects.length).fill(false);
      fixture.detectChanges();
      const iframes = fixture.debugElement.queryAll(By.css('iframe'));
      expect(iframes.length).toBe(fakeSchoolProjects.length);
    });

    it('should display GitHub link if available', () => {
      component.projects = fakeSchoolProjects;
      fixture.detectChanges();
      const projectItems = fixture.debugElement.queryAll(By.css('.project-item'));
      projectItems.forEach((item, index) => {
        const project = fakeSchoolProjects[index];
        if (project.githubLink) {
          const githubLink = item.query(By.css('a[href="' + project.githubLink + '"]'));
          expect(githubLink).toBeTruthy();
        }
      });
    });

    it('should display report link if available', () => {
      component.projects = fakeSchoolProjects;
      fixture.detectChanges();
      const projectItems = fixture.debugElement.queryAll(By.css('.project-item'));
      projectItems.forEach((item, index) => {
        const project = fakeSchoolProjects[index];
        if (project.documentUrl) {
          const reportLink = item.query(By.css('a[href="' + project.documentUrl + '"]'));
          expect(reportLink).toBeTruthy();
        }
      });
    });

    it('should display "Confidential" if no links available', () => {
      component.projects = fakeSchoolProjects.map(project => ({ ...project, githubLink: '', documentUrl: '' }));
      fixture.detectChanges();
      const confidentialTexts = fixture.debugElement.queryAll(By.css('.project-item p:last-child'));
      confidentialTexts.forEach(item => {
        expect(item.nativeElement.textContent.trim()).toBe('school_projects.confidential');
      });
    });
  });
});
