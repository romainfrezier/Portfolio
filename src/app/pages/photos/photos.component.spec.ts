import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotosComponent} from './photos.component';
import {TranslateService} from "@ngx-translate/core";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireStorageMock} from "@tests/mocks/angular-fire-storage.mock";

describe('PhotoComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  // let translateService: TranslateService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: AngularFireStorage, useClass: AngularFireStorageMock},
        {provide: 'angularfire2.app.options', useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(PhotosComponent);
    // translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
