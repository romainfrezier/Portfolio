import {Component, OnInit} from '@angular/core';
import {Achievement} from '@models/achievement.model';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {DataService} from '@services/data.service';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component handles the display and logic for the Achievements section of the application.
 */
@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent implements OnInit {
  /**
   * A list of achievements to be displayed.
   */
  public achievements!: Achievement[];

  /**
   * @constructor
   * @param dataService - Service to fetch achievements data.
   * @param translate - Service to handle translations.
   */
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? this.translate.defaultLang;
    this.dataService
      .getAchievements(lang)
      .subscribe((data: Achievement[]): void => {
        this.achievements = data;
      });
  }

  /**
   * Subscribe to language change events to fetch achievements in the new language.
   */
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchAchievements(event.lang);
    });
  }

  /**
   * Fetches achievements data based on the specified language.
   * @param lang - The language code to fetch achievements data for.
   */
  private fetchAchievements(lang: string): void {
    this.dataService
      .getAchievements(lang)
      .subscribe((data: Achievement[]): void => {
        this.achievements = data;
      });
  }
}
