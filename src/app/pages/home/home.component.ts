import {Component, OnInit} from '@angular/core';
import {Link} from '@models/link.model';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from "@services/data.service";

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a home page
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   * A list of social links to be displayed on the home page.
   */
  public socialLinks!: Link[];
  /**
   * The introductory text to be displayed on the home page.
   */
  public introText?: string;
  /**
   * Flag indicating whether the contact modal is shown.
   */
  public showContactModal: boolean;

  /**
   * The birthdate used to calculate age.
   */
  private birthDate: Date;

  /**
   * @constructor
   * @param dataService - Service to fetch data.
   * @param translate - Service to handle translations.
   */
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    this.dataService.getLinks().subscribe((data) => {
      this.socialLinks = data;
    });
    this.birthDate = new Date(2001, 5, 29);
    this.translate.onLangChange.subscribe(() => {
      this.getRoleText();
    });
    this.showContactModal = false;
  }

  /**
   * Set the role text on initialization
   */
  public ngOnInit(): void {
    this.getRoleText();
  }

  /**
   * Retrieves and sets the introductory role text based on the current language.
   */
  public getRoleText(): void {
    this.translate
      .get('home.role', {age: this.calculateAge()})
      .subscribe((res: string): void => {
        this.introText = res;
      });
  }

  /**
   * Calculates the age based on the birthdate.
   * @returns The calculated age.
   */
  private calculateAge(): number {
    const today: Date = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();
    const dayDiff = today.getDate() - this.birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  /**
   * Opens the contact modal.
   */
  public openContactModal() {
    this.showContactModal = true;

  }

  /**
   * Closes the contact modal.
   */
  public closeContactModal() {
    this.showContactModal = false;
  }
}
