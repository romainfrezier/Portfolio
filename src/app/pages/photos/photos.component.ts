import {Component, OnInit} from '@angular/core';
import {PhotoService} from "@services/photo.service";

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
  imageUrls: string[] = [];
  selectedImageUrl: string | null = null;
  isModalVisible: boolean = false;

  /**
   * @constructor
   * @param photoService The service to fetch images from
   */
  constructor(private photoService: PhotoService) {}

  /**
   * Fetches images from the service on component initialization
   */
  ngOnInit(): void {
    this.photoService.getImages().subscribe((urls: string[]) => {
      this.imageUrls = urls;
    });
  }

  /**
   * Opens the modal with the selected image
   * @param url The url of the image to display
   * @returns void
  */
  public openModal(url: string): void {
    this.selectedImageUrl = url;
    this.isModalVisible = true;
  }

  /**
   * Closes the modal
   * @returns void
   */
  public closeModal(): void {
    this.isModalVisible = false;
    this.selectedImageUrl = null;
  }
}
