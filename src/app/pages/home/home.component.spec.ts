import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {TranslateService} from "@ngx-translate/core";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {DataService} from "@services/data.service";
import {DataServiceMock} from "@tests/mocks/data.service.mock";
import {fakeLinks} from "@tests/fake.data";
import {AppConstants} from "@app/app.constants";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let translateService: TranslateService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: DataService, useClass: DataServiceMock},
      ]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch social links on init', () => {
    expect(component.socialLinks).toEqual(fakeLinks);
  });

  it('should calculate age correctly', () => {
    const age = component['calculateAge']();
    const today: Date = new Date();
    const birthDate: Date = new Date(2001, 5, 29)

    let expectedAge: number = today.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassedThisYear = today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassedThisYear) {
      expectedAge--;
    }
    expect(age).toBe(expectedAge);
  });

  it('should set introText on language change', () => {
    jest.spyOn(component, 'getRoleText');
    translateService.use(AppConstants.LANGUAGES.EN);
    translateService.use(AppConstants.LANGUAGES.FR);
    fixture.detectChanges();
    expect(component.getRoleText).toHaveBeenCalled();
  });

  it('should open and close contact modal', () => {
    component.openContactModal();
    expect(component.showContactModal).toBe(true);

    component.closeContactModal();
    expect(component.showContactModal).toBe(false);
  });
});
