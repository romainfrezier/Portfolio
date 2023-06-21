import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Project} from "../../models/project.model";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public projects!: Project[];

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.http.get<any>(`./assets/locales/${translate.currentLang}.json`).subscribe((data: any): void => {
      this.projects = data.portfolio.items;
    });
  }
}
