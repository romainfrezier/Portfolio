import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Project} from "../../models/project.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public projects!: Project[];
  public demoLinks: (SafeResourceUrl | null)[];

  constructor(private http: HttpClient, private translate: TranslateService, private sanitizer: DomSanitizer) {
    this.demoLinks = [];
    this.http.get<any>(`./assets/locales/${translate.currentLang}.json`).subscribe(data => {
      this.projects = data.portfolio.items;
      for (let project of this.projects) {
        if (project.demolink) {
          this.demoLinks.push(this.sanitizer.bypassSecurityTrustResourceUrl(project.demolink));
        } else {
          this.demoLinks.push(null);
        }
      }
    });
  }

  public getSafeDemoLink(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
