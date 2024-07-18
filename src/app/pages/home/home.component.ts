import {Component, OnInit} from '@angular/core';
import {Link} from '@models/link.model';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from "@services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public socialLinks!: Link[];
  public introText?: string;
  public showContactModal: boolean;

  private birthDate: Date;

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

  public ngOnInit(): void {
    this.getRoleText();
  }

  public getRoleText(): void {
    this.translate
      .get('home.role', {age: this.calculateAge()})
      .subscribe((res: string): void => {
        this.introText = res;
      });
  }

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

  public openContactModal() {
    this.showContactModal = true;

  }

  public closeContactModal() {
    this.showContactModal = false;
  }
}
