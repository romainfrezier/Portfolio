import { Component } from '@angular/core';
import {Link} from "../../models/link.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public socialLinks!: Link[];

  constructor(private http: HttpClient) {
    this.http.get<{ links: Link[] }>('./assets/data/social-links.json').subscribe(data => {
      this.socialLinks = data.links;
    });
  }

}
