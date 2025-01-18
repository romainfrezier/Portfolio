import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotoModalComponent} from './photo-modal.component';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {fakeUrls} from "@tests/mocks/minio.service.mock";

describe('PhotoModalComponent', (): void => {
  let component: PhotoModalComponent;
  let fixture: ComponentFixture<PhotoModalComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [PhotoModalComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(PhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  it('should display the image when imageUrl is provided', (): void => {
    component.imageUrl = fakeUrls[0];
    component.isVisible = true;
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain(fakeUrls[0]);
  });

  it('should not display the image when imageUrl is null', (): void => {
    component.imageUrl = null;
    component.isVisible = true;
    fixture.detectChanges();

    const imgElement: DebugElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeNull();
  });

  it('should emit closeModal event when close() is called', (): void => {
    jest.spyOn(component.closeModal, 'emit');

    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should close modal on Escape key press', (): void => {
    const keyboardEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    jest.spyOn(component, 'close');

    document.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    expect(component.close).toHaveBeenCalled();
  });

  it('should not close modal if another key is pressed', (): void => {
    const keyboardEvent: KeyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    jest.spyOn(component, 'close');

    document.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    expect(component.close).not.toHaveBeenCalled();
  });

  it('should display the modal if isVisible is true and imageUrlDefined', (): void => {
    component.isVisible = true;
    component.imageUrl = fakeUrls[0];
    fixture.detectChanges();

    const modalElement = fixture.debugElement.query(By.css('.modal')).nativeElement;
    expect(modalElement).toBeTruthy();
  });

  it('should not display the modal if isVisible is false', (): void => {
    component.isVisible = false;
    fixture.detectChanges();

    const modalElement: DebugElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeNull();
  });
});
