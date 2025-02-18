import {Component, HostListener, OnInit} from '@angular/core';
import {MinioService} from "@services/minio.service";
import {SwipeService} from "@services/swipe.service";
import {AppConstants} from "@app/app.constants";

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component handles the display of the photos section of the application.
 */
@Component({
  selector: 'app-photo',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {
  imageUrls: string[];
  selectedImageUrl: string | null;
  isModalVisible: boolean;
  currentIndex: number;

  /**
   * @constructor
   * @param minioService The service to fetch images from
   * @param swipeService
   */
  constructor(private minioService: MinioService, private swipeService: SwipeService) {
    this.imageUrls = [];
    this.selectedImageUrl = null;
    this.isModalVisible = false;
    this.currentIndex = -1;
  }

  /**
   * Fetches images from the service on component initialization
   */
  ngOnInit(): void {
    this.minioService.listAllObjects(AppConstants.MINIO.BUCKET.PICTURES).subscribe(keys => {
      keys.forEach((key: string): void => {
        this.minioService.getObject(AppConstants.MINIO.BUCKET.PICTURES, key).subscribe(blob => {
          const objectUrl: string = URL.createObjectURL(blob);
          this.imageUrls.push(objectUrl);
        });
      });
    });
  }

  /**
   * Opens the modal with the selected image
   * @param url The url of the image to display
   * @returns void
  */
  public openModal(url: string): void {
    this.selectedImageUrl = url;
    this.currentIndex = this.imageUrls.indexOf(url);
    this.isModalVisible = true;

    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the modal
   * @returns void
   */
  public closeModal(): void {
    this.isModalVisible = false;
    this.selectedImageUrl = null;
    this.currentIndex = -1;

    document.body.style.overflow = '';
  }

  /**
   * Shows the previous image in the gallery
   * @returns void
   */
  showPreviousImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedImageUrl = this.imageUrls[this.currentIndex];
    }
  }

  /**
   * Shows the next image in the gallery
   * @returns void
   */
  showNextImage(): void {
    if (this.currentIndex < this.imageUrls.length - 1) {
      this.currentIndex++;
      this.selectedImageUrl = this.imageUrls[this.currentIndex];
    }
  }

  /**
   * Handles keydown events to navigate between images
   * @param event The keyboard event
   * @returns void
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isModalVisible) return;

    if (event.key === 'ArrowLeft') {
      this.showPreviousImage();
    } else if (event.key === 'ArrowRight') {
      this.showNextImage();
    }
  }

  /**
   * Handles touch start events
   * @param event The touch event
   * @returns void
  */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!this.isModalVisible) return;

    this.swipeService.handleTouchStart(event);
  }

  /**
   * Handles touch end events to navigate between images
   * @param event The touch event
   * @returns void
   */
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.isModalVisible) return;

    const swipeDirection: string = this.swipeService.handleTouchEnd(event);
    if (swipeDirection === AppConstants.SWIPE.LEFT) {
      this.showNextImage();
    } else if (swipeDirection === AppConstants.SWIPE.RIGHT) {
      this.showPreviousImage();
    }
  }
}
