import {Component, OnInit} from '@angular/core';
import {DataService} from '@services/data.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {WorkExperience} from '@models/work-experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './work-experiences.component.html',
  styleUrls: ['./work-experiences.component.scss'],
})
export class WorkExperiencesComponent implements OnInit {
  public experiences!: WorkExperience[];

  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? translate.defaultLang;
    this.fetchProjects(lang);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchProjects(event.lang);
    });
  }

  private fetchProjects(lang: string): void {
    this.dataService
      .getWorkExperiences(lang)
      .subscribe((data: WorkExperience[]): void => {
        this.experiences = data;
      });
  }
}
