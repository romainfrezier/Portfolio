import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ContactModalComponent} from './contact-modal.component';
import {DebugElement} from "@angular/core";
import {MailService} from "@services/mail.service";
import {TranslateService} from "@ngx-translate/core";
import {ToastService} from "@services/toast.service";
import {FormBuilder} from "@angular/forms";
import {TranslateServiceMock} from "@tests/mocks/translate.service.mock";
import {MailServiceMock} from "@tests/mocks/mail.service.mock";
import {ToastServiceMock} from "@tests/mocks/toast.service.mock";

describe('ContactModalComponent', (): void => {
  let component: ContactModalComponent;
  let fixture: ComponentFixture<ContactModalComponent>;
  let mailService: MailService;
  let toastService: ToastService;
  let translateService: TranslateService;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ContactModalComponent],
      providers: [
        {provide: MailService, useClass: MailServiceMock},
        {provide: ToastService, useClass: ToastServiceMock},
        {provide: TranslateService, useClass: TranslateServiceMock},
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach((): void  => {
    jest.clearAllMocks();
    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
    mailService = TestBed.inject(MailService);
    toastService = TestBed.inject(ToastService);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  describe('Component', (): void => {
    it('should create', (): void => {
      expect(component).toBeTruthy();
    });

    it('should have a defined component', (): void => {
      expect(component).toBeDefined();
    });

    it('should call ngOnInit', ((): void => {
      jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalled();
    }));
  });

  describe('Template', (): void => {
    it('should render the title in a h2 tag', () => {
      const compiled = fixture.debugElement.nativeElement;
      const title = compiled.querySelector('h2');
      expect(title.textContent).toContain('✉️ contact-form.title');
    });

    it('should render the form', (): void => {
      const compiled = fixture.debugElement;
      const formElement = compiled.query(By.css('form'));
      expect(formElement).toBeTruthy();
    });
  });

  describe('Form validation', (): void => {
    it('should return true when all fields are filled', () => {
      component.contactForm.setValue({
        name: 'John',
        firstName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello, World!',
      });
      expect(component.contactForm.valid).toBe(true);
    });

    it('should return false when any field is empty', (): void => {
      component.contactForm.setValue({
        name: 'John',
        firstName: 'Doe',
        email: '',
        message: 'Hello, World!',
      });
      expect(component.contactForm.valid).toBe(false);

      component.contactForm.setValue({
        name: 'John',
        firstName: '',
        email: 'john.doe@example.com',
        message: 'Hello, World!',
      });
      expect(component.contactForm.valid).toBe(false);

      component.contactForm.setValue({
        name: '',
        firstName: 'Doe',
        email: 'john.doe@example.com',
        message: 'Hello, World!',
      });
      expect(component.contactForm.valid).toBe(false);

      component.contactForm.setValue({
        name: 'John',
        firstName: 'Doe',
        email: 'john.doe@example.com',
        message: '',
      });
      expect(component.contactForm.valid).toBe(false);
    });
  });

  describe('Close modal', (): void => {
    it('should close the modal when clicking on the backdrop', () => {
      jest.spyOn(component, 'onBackdropClick');
      jest.spyOn(component, 'closeModalWithAnimation');

      const backdrop: DebugElement = fixture.debugElement.query(By.css('.contact-modal-backdrop'));
      expect(backdrop).toBeTruthy();

      backdrop.triggerEventHandler('click', {target: backdrop.nativeElement});

      expect(component.onBackdropClick).toHaveBeenCalled();
      expect(component.closeModalWithAnimation).toHaveBeenCalled();
      expect(component.modalShown).toBe(false);
    });

    it('should close the modal when clicking on the close button', () => {
      jest.spyOn(component, 'closeModalWithAnimation');

      const closeButton: DebugElement = fixture.debugElement.query(By.css('.close-button'));
      expect(closeButton).toBeTruthy();

      closeButton.triggerEventHandler('click', {target: closeButton.nativeElement});

      expect(component.closeModalWithAnimation).toHaveBeenCalled();
      expect(component.modalShown).toBe(false);
    });

    it('should close set modalShown to false after 500ms', (): void => {
      jest.useFakeTimers();
      component.closeModalWithAnimation();
      expect(component.modalShown).toBe(false);
      jest.runAllTimers();
    });
  });

  describe('Form submission', (): void => {
    it('should call sendEmail and show success message on success', async (): Promise<void> => {
      jest.spyOn(mailService, 'sendEmail');
      jest.spyOn(toastService, 'showSuccess')
      jest.spyOn(component, 'closeModalWithAnimation');
      jest.spyOn(translateService, 'get');

      component.contactForm.setValue({
        name: 'Test',
        firstName: 'User',
        email: 'test@example.com',
        message: 'Hello'
      });

      await component.onSubmit();

      expect(mailService.sendEmail).toHaveBeenCalledWith('User', 'Test', 'test@example.com', 'Hello');
      expect(toastService.showSuccess).toHaveBeenCalledWith('contact-form.success');
      expect(component.closeModalWithAnimation).toHaveBeenCalled();
      expect(component.loading).toBe(false);
    });

    it('should call sendEmail and show error message on failure', async (): Promise<void> => {
      jest.spyOn(mailService, 'sendEmail').mockImplementation(() => {
        return Promise.reject(new Error('Something went wrong'));
      });
      jest.spyOn(toastService, 'showError')
      jest.spyOn(component, 'closeModalWithAnimation');
      jest.spyOn(translateService, 'get');


      component.contactForm.setValue({
        name: 'Test',
        firstName: 'User',
        email: 'test@example.com',
        message: 'Hello'
      });

      await component.onSubmit();

      expect(mailService.sendEmail).toHaveBeenCalledWith('User', 'Test', 'test@example.com', 'Hello');
      expect(toastService.showError).toHaveBeenCalledWith('contact-form.error');
      expect(component.closeModalWithAnimation).toHaveBeenCalled();
      expect(component.loading).toBe(false);
    });

    it('should not call sendEmail if the form is invalid', () => {
      jest.spyOn(mailService, 'sendEmail');

      component.contactForm.setValue({
        name: '',
        firstName: '',
        email: '',
        message: ''
      });

      component.onSubmit();

      expect(component.loading).toBe(false);
      expect(mailService.sendEmail).not.toHaveBeenCalled();
    });
  });
});
