import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotosComponent} from './photos.component';
import {TranslateService} from "@ngx-translate/core";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {PhotoModalComponent} from "@pages/photos/photo-modal/photo-modal.component";
import {PhotoService} from "@services/photo.service";
import {fakeUrls, PhotoServiceMock} from "@tests/mocks/photo.service.mock";
import {SwipeService} from "@services/swipe.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {mockAngularFireStorage} from "@tests/mocks/firebase.storage.mock";
import {AppConstants} from "@app/app.constants";

describe('PhotoComponent', (): void => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let photoService: PhotoService;
  let swipeService: SwipeService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent, PhotoModalComponent],
      providers: [
        {provide: TranslateService, useClass: TranslateServiceMock},
        {provide: PhotoService, useClass: PhotoServiceMock},
        {provide: SwipeService},
        {provide: AngularFireStorage, useValue: mockAngularFireStorage},
        {provide: 'angularfire2.app.options', useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(PhotosComponent);
    photoService = TestBed.inject(PhotoService);
    swipeService = TestBed.inject(SwipeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component', (): void => {
    it('should create', (): void => {
      expect(component).toBeTruthy();
    });

    it('should fetch images on init', (): void => {
      jest.spyOn(photoService, 'getImages');
      component.ngOnInit();
      expect(photoService.getImages).toHaveBeenCalled();
      expect(component.imageUrls).toEqual(fakeUrls);
    });

    it('should open the modal with the selected image', (): void => {
      const imageUrl = 'image1.jpg';
      component.openModal(imageUrl);
      expect(component.selectedImageUrl).toBe(imageUrl);
      expect(component.isModalVisible).toBeTruthy();
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should close the modal', (): void => {
      component.closeModal();
      expect(component.isModalVisible).toBeFalsy();
      expect(component.selectedImageUrl).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });

    it('should navigate to the next image', (): void => {
      component.imageUrls = fakeUrls;
      component.currentIndex = 0;

      component.showNextImage();
      expect(component.currentIndex).toBe(1);
      expect(component.selectedImageUrl).toBe(fakeUrls[1]);
    });

    it('should navigate to the previous image', (): void => {
      component.imageUrls = fakeUrls;
      component.currentIndex = 1;

      component.showPreviousImage();
      expect(component.currentIndex).toBe(0);
      expect(component.selectedImageUrl).toBe(fakeUrls[0]);
    });

    it('should handle keyboard navigation', (): void => {
      component.imageUrls = fakeUrls;
      component.currentIndex = 1;
      component.isModalVisible = true;

      const eventLeft: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.handleKeyDown(eventLeft);
      expect(component.currentIndex).toBe(0);

      const eventRight: KeyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.handleKeyDown(eventRight);
      expect(component.currentIndex).toBe(1);

      component.isModalVisible = false;
      component.handleKeyDown(eventLeft);
      expect(component.currentIndex).toBe(1);
    });

    it('should handle touch start', (): void => {
      const touchEvent: TouchEvent = {
        touches: [{clientX: 100, clientY: 200}]
      } as unknown as TouchEvent;
      component.isModalVisible = true;

      jest.spyOn(swipeService, 'handleTouchStart');
      component.onTouchStart(touchEvent);
      expect(swipeService.handleTouchStart).toHaveBeenCalledWith(touchEvent);
    });

    it('should handle touch end and navigate next', (): void => {
      const touchEvent: TouchEvent = {
        changedTouches: [{clientX: 100, clientY: 200}]
      } as unknown as TouchEvent;
      component.imageUrls = fakeUrls;
      component.currentIndex = 0;
      component.isModalVisible = true;

      jest.spyOn(swipeService, 'handleTouchEnd').mockReturnValue(AppConstants.SWIPE.LEFT);
      component.onTouchEnd(touchEvent);
      expect(swipeService.handleTouchEnd).toHaveBeenCalledWith(touchEvent);
      expect(component.currentIndex).toBe(1);
      expect(component.selectedImageUrl).toBe(fakeUrls[1]);
    });

    it('should handle touch end and navigate previous', (): void => {
      const touchEvent: TouchEvent = {
        changedTouches: [{clientX: 100, clientY: 200}]
      } as unknown as TouchEvent;
      component.imageUrls = fakeUrls;
      component.currentIndex = 1;
      component.isModalVisible = true;

      jest.spyOn(swipeService, 'handleTouchEnd').mockReturnValue(AppConstants.SWIPE.RIGHT);
      component.onTouchEnd(touchEvent);
      expect(swipeService.handleTouchEnd).toHaveBeenCalledWith(touchEvent);
      expect(component.currentIndex).toBe(0);
      expect(component.selectedImageUrl).toBe(fakeUrls[0]);
    });
  });
});
