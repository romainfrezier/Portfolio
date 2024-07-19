import {Injectable} from '@angular/core';
import {ToastService} from "@services/toast.service";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Mock service for testing purposes, extending the ToastService to provide mock data.
 */
@Injectable()
export class ToastServiceMock extends ToastService {
  override showSuccess(message: string) {
    super.showSuccess(message);
  }

  override showError(message: string) {
    super.showError(message);
  }

  override showInfo(message: string) {
    super.showInfo(message);
  }
}
