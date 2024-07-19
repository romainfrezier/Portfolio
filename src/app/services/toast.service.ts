import {Injectable} from '@angular/core';
import {AppConstants} from "@app/app.constants";
import {Toast} from "@models/toast.model";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for managing and applying themes in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /**
   * Collection of toasts
   */
  public toasts: Toast[];

  /**
   * @constructor
   * Create an empty collection of toasts
   */
  constructor() {
    this.toasts = [];
  }

  /**
   * Show a success toast
   *
   * @param message The message displayed
   */
  public showSuccess(message: string): void {
    const toastType = AppConstants.TOAST.TYPES.SUCCESS;
    this.showToast(message, toastType)
  }

  /**
   * Show an error toast
   *
   * @param message The message displayed
   */
  public showError(message: string): void {
    const toastType = AppConstants.TOAST.TYPES.ERROR;
    this.showToast(message, toastType)
  }

  /**
   * Show an information toast
   *
   * @param message The message displayed
   */
  public showInfo(message: string): void {
    const toastType = AppConstants.TOAST.TYPES.INFO;
    this.showToast(message, toastType)
  }

  /**
   * Add a toast to the toast collection. Add it at the end of the collection
   *
   * @param message The message displayed
   * @param type The toast type
   * @private
   */
  private showToast(message: string, type: "success" | "error" | "info" = "info"): void {
    const toast: Toast = { message, type }
    this.toasts.push(toast);
    setTimeout(() => this.removeToast(toast), AppConstants.TOAST.DELAY);
  }

  /**
   * Remove a toast from the toast collection. Remove the first one of the collection
   *
   * @param toast The toast to remove
   * @private
   */
  private removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter((t: Toast): boolean => t !== toast);
  }
}
