import {Component} from '@angular/core';
import {Router} from "@angular/router";

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component represents the About section of the application
 * It displays information about me
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  /**
   * @constructor
   * @param router The router service
   */
  constructor(private router: Router) {}

  /**
   * Go to the photos section
   * @return void
   */
  public goToPhotos(): void {
    this.router.navigate(['/photos']);
  }
}
