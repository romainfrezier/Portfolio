import {Component, OnInit} from '@angular/core';
import {DataService} from "@services/data.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {AppConstants} from "@app/app.constants";
import {PersonalProject} from "@models/personal-project.model";

@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrls: ['./personal-projects.component.scss']
})
export class PersonalProjectsComponent implements OnInit {

  public projects!: PersonalProject[];

  constructor(private dataService: DataService, private translate: TranslateService) {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) || translate.defaultLang;
    this.fetchProjects(lang);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchProjects(event.lang);
    });
  }

  private fetchProjects(lang: string): void {
    this.dataService.getPersonalProjects(lang).subscribe((data: PersonalProject[]): void => {
      this.projects = data;
    });
  }
}
