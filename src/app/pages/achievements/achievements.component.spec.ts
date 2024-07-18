import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AchievementsComponent} from './achievements.component';
import {TranslateService} from "@ngx-translate/core";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {DataService} from "@services/data.service";
import {DataServiceMock} from "@tests/mocks/data.service.mock";
import {fakeAchievements} from "@tests/fake.data";
import {AppConstants} from "@app/app.constants";

/**
 * @author Romain Frezier
 * @test
 */
describe('AchievementsComponent', () => {
  let component: AchievementsComponent;
  let fixture: ComponentFixture<AchievementsComponent>;
  let translateService: TranslateService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AchievementsComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: DataService, useClass: DataServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch achievements on creation', () => {
    expect(component.achievements).toEqual(fakeAchievements);
  });

  it('should fetch achievements on language change', () => {
    jest.spyOn(dataService, 'getAchievements');
    translateService.use(AppConstants.LANGUAGES.EN);
    translateService.use(AppConstants.LANGUAGES.FR);
    expect(component.achievements).toEqual(fakeAchievements);
    expect(dataService.getAchievements).toHaveBeenCalledWith(AppConstants.LANGUAGES.FR);
  });
});
