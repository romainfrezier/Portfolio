import {Component, OnInit} from '@angular/core';
import {DataService} from '@services/data.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AppConstants} from '@app/app.constants';
import {Education} from "@models/education.model";

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays education
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  /**
   * A list of education to be displayed.
   */
  public education!: Education[];

  /**
   * @constructor
   * @param dataService - Service to fetch education data.
   * @param translate - Service to handle translations.
   */
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
  ) {
    const lang: string = localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) ?? translate.defaultLang;
    this.fetchEducation(lang);
  }

  /**
   * Subscribe to language change events to fetch education in the new language.
   */
  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
      this.fetchEducation(event.lang);
    });
  }

  /**
   * Fetches education data based on the specified language.
   * @param lang - The language code to fetch education data for.
   */
  private fetchEducation(lang: string): void {
    this.dataService
      .getEducation(lang)
      .subscribe((data: Education[]): void => {
        this.education = data;
      });
  }
}
