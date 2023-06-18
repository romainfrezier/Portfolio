import {Component} from '@angular/core';
import {Achievement} from "../../models/achievement.model";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent {

  public achievements!: Achievement[];

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.http.get<any>(`./assets/locales/${translate.currentLang}.json`).subscribe(data => {
      this.achievements = data.achievements.items;
    });
  }

}
