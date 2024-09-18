import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component handles the display of a modal for displaying a photo.
 */
@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrl: './photo-modal.component.scss'
})
export class PhotoModalComponent {
  /**
   * The url of the image to display
   */
  @Input() imageUrl: string | null;
  /**
   * Whether the modal is visible or not
   */
  @Input() isVisible: boolean;
  /**
   * Event emitter for closing the modal
   */
  @Output() closeModal: EventEmitter<void>;

  /**
   * @constructor
   */
  constructor() {
    this.closeModal = new EventEmitter<void>();
    this.imageUrl = null;
    this.isVisible = false;
  }

  /**
   * Closes the modal
   */
  public close() {
    this.closeModal.emit();
  }
}
