import {Component, OnInit} from '@angular/core';
import {Achievement} from "@models/achievement.model";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {AppConstants} from "@app/app.constants";
import {DataService} from "@services/data.service";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  public achievements!: Achievement[];

  constructor(private dataService: DataService, private translate: TranslateService) {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) || translate.defaultLang;
    this.dataService.getAchievements(lang).subscribe((data: Achievement[]): void => {
      this.achievements = data;
    });
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchAchievements(event.lang);
    });
  }

  private fetchAchievements(lang: string): void {
    this.dataService.getAchievements(lang).subscribe((data: Achievement[]): void => {
      this.achievements = data;
    });
  }

}
