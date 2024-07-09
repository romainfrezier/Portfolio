import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Achievement} from '@models/achievement.model';
import {SchoolProject} from '@models/school-project.model';
import {PersonalProject} from '@models/personal-project.model';
import {WorkExperience} from '@models/work-experience.model';
import {Skills} from '@models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getSchoolProjects(lang: string): Observable<SchoolProject[]> {
    return this.http.get<SchoolProject[]>(
      `./assets/data/${lang}/school-projects.json`,
    );
  }

  public getPersonalProjects(lang: string): Observable<PersonalProject[]> {
    return this.http.get<PersonalProject[]>(
      `./assets/data/${lang}/personal-projects.json`,
    );
  }

  public getWorkExperiences(lang: string): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(
      `./assets/data/${lang}/work-experiences.json`,
    );
  }

  public getAchievements(lang: string): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(
      `./assets/data/${lang}/achievements.json`,
    );
  }

  public getArchivedProjects(lang: string): Observable<SchoolProject[]> {
    return this.http.get<SchoolProject[]>(
      `./assets/data/${lang}/archived-school-projects.json`,
    );
  }

  public getSkills(): Observable<Skills> {
    return this.http.get<Skills>(`./assets/data/skills.json`);
  }
}
