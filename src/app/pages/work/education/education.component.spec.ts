import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EducationComponent} from './education.component';
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "@services/data.service";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {DataServiceMock} from "@tests/mocks/data.service.mock";
import {fakeEducation} from "@tests/fake.data";
import {AppConstants} from "@app/app.constants";

/**
 * @author Romain Frezier
 * @test
 */
describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let translateService: TranslateService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: DataService, useClass: DataServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch education on creation', () => {
    expect(component.education).toEqual(fakeEducation);
  });

  it('should fetch education on language change', () => {
    jest.spyOn(dataService, 'getEducation');
    translateService.use(AppConstants.LANGUAGES.EN);
    translateService.use(AppConstants.LANGUAGES.FR);
    expect(component.education).toEqual(fakeEducation);
    expect(dataService.getEducation).toHaveBeenCalledWith(AppConstants.LANGUAGES.FR);
  });
});
