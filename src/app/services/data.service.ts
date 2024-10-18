import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Achievement} from '@models/achievement.model';
import {SchoolProject} from '@models/school-project.model';
import {PersonalProject} from '@models/personal-project.model';
import {WorkExperience} from '@models/work-experience.model';
import {Skills} from '@models/skills.model';
import {Link} from "@models/link.model";
import {Education} from "@models/education.model";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for fetching data from JSON files.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /**
   * @constructor
   * @param http - HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches school projects data based on the specified language.
   * @param lang - The language code to fetch school projects data for.
   * @returns An observable of an array of SchoolProject objects.
   */
  public getSchoolProjects(lang: string): Observable<SchoolProject[]> {
    return this.http.get<SchoolProject[]>(
      `./assets/data/${lang}/school-projects.json`,
    );
  }

  /**
   * Fetches personal projects data based on the specified language.
   * @param lang - The language code to fetch personal projects data for.
   * @returns An observable of an array of PersonalProject objects.
   */
  public getPersonalProjects(lang: string): Observable<PersonalProject[]> {
    return this.http.get<PersonalProject[]>(
      `./assets/data/${lang}/personal-projects.json`,
    );
  }

  /**
   * Fetches work experiences data based on the specified language.
   * @param lang - The language code to fetch work experiences data for.
   * @returns An observable of an array of WorkExperience objects.
   */
  public getWorkExperiences(lang: string): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(
      `./assets/data/${lang}/work-experiences.json`,
    );
  }

  /**
   * Fetches achievements data based on the specified language.
   * @param lang - The language code to fetch achievements data for.
   * @returns An observable of an array of Achievement objects.
   */
  public getAchievements(lang: string): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(
      `./assets/data/${lang}/achievements.json`,
    );
  }

  /**
   * Fetches archived school projects data based on the specified language.
   * @param lang - The language code to fetch archived school projects data for.
   * @returns An observable of an array of SchoolProject objects.
   */
  public getArchivedProjects(lang: string): Observable<SchoolProject[]> {
    return this.http.get<SchoolProject[]>(
      `./assets/data/${lang}/archived-school-projects.json`,
    );
  }

  /**
   * Fetches skills data.
   * @returns An observable of a Skills object.
   */
  public getSkills(): Observable<Skills> {
    return this.http.get<Skills>(`./assets/data/skills.json`);
  }

  /**
   * Fetches social links data.
   * @returns An observable of an array of Link objects.
   */
  public getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>('./assets/data/social-links.json');
  }

  /**
   * Fetches educations data.
   * @returns An observable of an array of Education objects.
   */
  public getEducation(lang: string): Observable<Education[]> {
    return this.http.get<Education[]>(`./assets/data/${lang}/education.json`);
  }
}
