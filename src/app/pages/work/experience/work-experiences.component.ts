import {Component, OnInit} from '@angular/core';
import {DataService} from '@services/data.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {WorkExperience} from '@models/work-experience.model';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a list of work experiences
 */
@Component({
  selector: 'app-experience',
  templateUrl: './work-experiences.component.html',
  styleUrls: ['./work-experiences.component.scss'],
})
export class WorkExperiencesComponent implements OnInit {
  /**
   * A list of work experiences to be displayed.
   */
  public experiences!: WorkExperience[];

  /**
   * @constructor
   * @param dataService - Service to fetch work experiences data.
   * @param translate - Service to handle translations.
   */
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? translate.defaultLang;
    this.fetchProjects(lang);
  }

  /**
   * Subscribe to language change events to fetch work experiences in the new language.
   */
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchProjects(event.lang);
    });
  }

  /**
   * Fetches work experiences data based on the specified language.
   * @param lang - The language code to fetch work experiences data for.
   */
  private fetchProjects(lang: string): void {
    this.dataService
      .getWorkExperiences(lang)
      .subscribe((data: WorkExperience[]): void => {
        this.experiences = data;
      });
  }
}
