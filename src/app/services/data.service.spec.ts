import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {DataService} from './data.service';
import {
  fakeAchievements,
  fakeArchivedProjects, fakeLinks,
  fakePersonalProjects,
  fakeSchoolProjects, fakeSkills,
  fakeWorkExperiences
} from "@tests/fake.data";
import {AppConstants} from "@app/app.constants";

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [DataService, provideHttpClientTesting()]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch school projects', () => {
    service.getSchoolProjects(AppConstants.LANGUAGES.EN).subscribe(projects => {
      expect(projects.length).toBe(1);
      expect(projects).toEqual(fakeSchoolProjects);
    });

    const req = httpMock.expectOne('./assets/data/en/school-projects.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakeSchoolProjects);
  });

  it('should fetch personal projects', () => {
    service.getPersonalProjects(AppConstants.LANGUAGES.EN).subscribe(projects => {
      expect(projects.length).toBe(1);
      expect(projects).toEqual(fakePersonalProjects);
    });

    const req = httpMock.expectOne('./assets/data/en/personal-projects.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakePersonalProjects);
  });

  it('should fetch work experiences', () => {
    service.getWorkExperiences(AppConstants.LANGUAGES.EN).subscribe(experiences => {
      expect(experiences.length).toBe(1);
      expect(experiences).toEqual(fakeWorkExperiences);
    });

    const req = httpMock.expectOne('./assets/data/en/work-experiences.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakeWorkExperiences);
  });

  it('should fetch achievements', () => {
    service.getAchievements(AppConstants.LANGUAGES.EN).subscribe(achievements => {
      expect(achievements.length).toBe(1);
      expect(achievements).toEqual(fakeAchievements);
    });

    const req = httpMock.expectOne('./assets/data/en/achievements.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakeAchievements);
  });

  it('should fetch archived projects', () => {
    service.getArchivedProjects(AppConstants.LANGUAGES.EN).subscribe(projects => {
      expect(projects.length).toBe(1);
      expect(projects).toEqual(fakeArchivedProjects);
    });

    const req = httpMock.expectOne('./assets/data/en/archived-school-projects.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakeArchivedProjects);
  });

  it('should fetch skills', () => {
    service.getSkills().subscribe(skills => {
      expect(skills).toEqual(fakeSkills);
    });

    const req = httpMock.expectOne('./assets/data/skills.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakeSkills);
  });

  it('should fetch links', () => {
    service.getLinks().subscribe(links => {
      expect(links).toEqual(fakeLinks);
    });

    const req = httpMock.expectOne('./assets/data/skills.json');
    expect(req.request.method).toBe('GET');
    req.flush(fakeSkills);
  });
});
