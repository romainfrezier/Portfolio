import {Component, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Project} from "@models/project.model";
import {AppConstants} from "@app/app.constants";
import {DataService} from "@services/data.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects!: Project[];
  public isLoading: boolean[];
  public showArchivedProjects: boolean;

  constructor(private dataService: DataService, private translate: TranslateService) {
    this.showArchivedProjects = false;
    this.isLoading = [];
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) || translate.defaultLang;
    this.fetchProjects(lang);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchProjects(event.lang);
      if (this.showArchivedProjects) {
        this.seeMoreProjects();
      }
    });
  }

  private fetchProjects(lang: string): void {
    this.dataService.getProjects(lang).subscribe((data: Project[]): void => {
      this.projects = data;
      for (let project of this.projects) {
        this.isLoading.push(true);
      }
      this.loadVideos();
    });
  }

  private loadVideos(): void {
    for (let i = 0; i < this.projects.length; i++) {
      setTimeout(() => {
        this.isLoading[i] = false;
      }, 1000);
    }
  }

  public seeMoreProjects() {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) || this.translate.defaultLang;
    this.dataService.getArchivedProjects(lang).subscribe((data: Project[]): void => {
      this.projects = this.projects.concat(data);
      for (let i = 0; i < data.length; i++) {
        this.isLoading.push(true);
      }
      this.loadVideos();
      this.showArchivedProjects = true;
    });
  }

  public seeLessProjects() {
    const lang = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) || this.translate.defaultLang;
    this.dataService.getArchivedProjects(lang).subscribe((data: Project[]): void => {
      this.projects = this.projects.slice(0, this.projects.length - data.length);
      this.showArchivedProjects = false;
    });
  }
}
