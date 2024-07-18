import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkExperiencesComponent} from './work-experiences.component';
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "@services/data.service";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {DataServiceMock} from "@tests/mocks/data.service.mock";
import {fakeWorkExperiences} from "@tests/fake.data";
import {AppConstants} from "@app/app.constants";

describe('ExperienceComponent', () => {
  let component: WorkExperiencesComponent;
  let fixture: ComponentFixture<WorkExperiencesComponent>;
  let translateService: TranslateService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkExperiencesComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: DataService, useClass: DataServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperiencesComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch work experiences on creation', () => {
    expect(component.experiences).toEqual(fakeWorkExperiences);
  });

  it('should fetch work experiences on language change', () => {
    jest.spyOn(dataService, 'getWorkExperiences');
    translateService.use(AppConstants.LANGUAGES.EN);
    translateService.use(AppConstants.LANGUAGES.FR);
    expect(component.experiences).toEqual(fakeWorkExperiences);
    expect(dataService.getWorkExperiences).toHaveBeenCalledWith(AppConstants.LANGUAGES.FR);
  });
});
