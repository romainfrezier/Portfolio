import {Component, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SchoolProject} from '@models/school-project.model';
import {AppConstants} from '@app/app.constants';
import {DataService} from '@services/data.service';

@Component({
  selector: 'app-work',
  templateUrl: './school-projects.component.html',
  styleUrls: ['./school-projects.component.scss'],
})
export class SchoolProjectsComponent implements OnInit {
  public projects!: SchoolProject[];
  public areLoading: boolean[];
  public showArchivedProjects: boolean;

  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    this.showArchivedProjects = false;
    this.areLoading = [];
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? translate.defaultLang;
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

  fetchProjects(lang: string): void {
    this.dataService
      .getSchoolProjects(lang)
      .subscribe((data: SchoolProject[]): void => {
        this.projects = data;
        this.projects.forEach(() => {
          this.areLoading.push(true);
        });
        this.loadVideos();
      });
  }

  protected loadVideos(): void {
    for (let i = 0; i < this.projects.length; i++) {
      setTimeout(() => {
        this.areLoading[i] = false;
      }, 1000);
    }
  }

  public seeMoreProjects() {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? this.translate.defaultLang;
    this.dataService
      .getArchivedProjects(lang)
      .subscribe((data: SchoolProject[]): void => {
        this.projects = this.projects.concat(data);
        data.forEach(() => {
          this.areLoading.push(true);
        });
        this.loadVideos();
        this.showArchivedProjects = true;
      });
  }

  public seeLessProjects() {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? this.translate.defaultLang;
    this.dataService
      .getArchivedProjects(lang)
      .subscribe((data: SchoolProject[]): void => {
        this.projects = this.projects.slice(
          0,
          this.projects.length - data.length,
        );
        this.showArchivedProjects = false;
      });
  }
}
