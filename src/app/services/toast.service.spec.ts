import {TestBed} from '@angular/core/testing';
import {ToastService} from './toast.service';
import {AppConstants} from '@app/app.constants';

jest.useFakeTimers();

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.toasts.length).toBe(0);
  });

  it('should show a success toast', () => {
    const message = 'Success message';
    service.showSuccess(message);

    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0]).toEqual({message, type: AppConstants.TOAST.TYPES.SUCCESS});
  });

  it('should show an error toast', () => {
    const message = 'Error message';
    service.showError(message);

    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0]).toEqual({message, type: AppConstants.TOAST.TYPES.ERROR});
  });

  it('should show an info toast', () => {
    const message = 'Info message';
    service.showInfo(message);

    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0]).toEqual({message, type: AppConstants.TOAST.TYPES.INFO});
  });

  it('should show an info toast by default', () => {
    const message = 'Info message';
    service['showToast'](message);

    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0]).toEqual({message, type: AppConstants.TOAST.TYPES.INFO});
  });

  it('should remove a toast after the delay', () => {
    const message = 'Info message';
    service.showInfo(message);

    expect(service.toasts.length).toBe(1);

    jest.advanceTimersByTime(AppConstants.TOAST.DELAY);

    expect(service.toasts.length).toBe(0);
  });

  it('should handle multiple toasts', () => {
    const messages = ['Message 1', 'Message 2', 'Message 3'];
    service.showSuccess(messages[0]);
    service.showError(messages[1]);
    service.showInfo(messages[2]);

    expect(service.toasts.length).toBe(3);
    expect(service.toasts[0]).toEqual({message: messages[0], type: AppConstants.TOAST.TYPES.SUCCESS});
    expect(service.toasts[1]).toEqual({message: messages[1], type: AppConstants.TOAST.TYPES.ERROR});
    expect(service.toasts[2]).toEqual({message: messages[2], type: AppConstants.TOAST.TYPES.INFO});

    jest.advanceTimersByTime(AppConstants.TOAST.DELAY);

    expect(service.toasts.length).toBe(0);
  });
});
