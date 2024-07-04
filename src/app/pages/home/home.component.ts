import {Component, OnInit} from '@angular/core';
import {Link} from "@models/link.model";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public socialLinks!: Link[];
  public introText?: string;
  private birthDate: Date;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.http.get<{ links: Link[] }>('./assets/data/social-links.json').subscribe(data => {
      this.socialLinks = data.links;
    });
    this.birthDate = new Date(2001, 5, 29);
    this.translate.onLangChange.subscribe(() => {
      this.getRoleText();
    });
  }

  public ngOnInit(): void {
    this.getRoleText();
  }

  private getRoleText(): void {
    this.translate.get('home.role', { age: this.calculateAge() }).subscribe((res: string): void => {
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

}
