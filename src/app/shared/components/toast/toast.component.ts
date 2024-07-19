import { Component } from '@angular/core';
import {ToastService} from "@services/toast.service";

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays toasts
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  /**
   * @constructor
   * @param toastService - Service to manage toast displaying
   */
  constructor(public toastService: ToastService) {}

}
