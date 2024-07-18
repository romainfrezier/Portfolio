import {Component, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SchoolProject} from '@models/school-project.model';
import {AppConstants} from '@app/app.constants';
import {DataService} from '@services/data.service';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a list of school projects
 */
@Component({
  selector: 'app-work',
  templateUrl: './school-projects.component.html',
  styleUrls: ['./school-projects.component.scss'],
})
export class SchoolProjectsComponent implements OnInit {
  /**
   * List of school projects to be displayed.
   */
  public projects!: SchoolProject[];
  /**
   * Array to track the loading state of each project videos.
   */
  public areLoading: boolean[];
  /**
   * Flag indicating whether archived projects are being shown.
   */
  public showArchivedProjects: boolean;

  /**
   * @constructor
   * @param dataService - Service to fetch school projects data.
   * @param translate - Service to handle translations.
   */
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    this.showArchivedProjects = false;
    this.areLoading = [];
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? translate.defaultLang;
    this.fetchProjects(lang);
  }

  /**
   * Subscribe to language change events to fetch school projects in the new language.
   */
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchProjects(event.lang);
      if (this.showArchivedProjects) {
        this.seeMoreProjects();
      }
    });
  }

  /**
   * Fetches school projects data based on the specified language.
   * @param lang - The language code to fetch school projects data for.
   */
  public fetchProjects(lang: string): void {
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

  /**
   * Simulates loading of project videos.
   * Sets loading state to false after a delay for each project.
   */
  protected loadVideos(): void {
    for (let i = 0; i < this.projects.length; i++) {
      setTimeout(() => {
        this.areLoading[i] = false;
      }, 1000);
    }
  }

  /**
   * Loads and displays archived projects.
   */
  public seeMoreProjects(): void {
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

  /**
   * Hides archived projects.
   */
  public seeLessProjects(): void {
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
