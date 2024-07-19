import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from "@services/data.service";
import {SchoolProject} from "@models/school-project.model";
import {PersonalProject} from "@models/personal-project.model";
import {WorkExperience} from "@models/work-experience.model";
import {Achievement} from "@models/achievement.model";
import {Skills} from "@models/skills.model";
import {Link} from "@models/link.model";
import {
  fakeAchievements,
  fakeArchivedProjects, fakeLinks,
  fakePersonalProjects,
  fakeSchoolProjects, fakeSkills,
  fakeWorkExperiences
} from "@tests/fake.data";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Mock service for testing purposes, extending the DataService to provide mock data.
 */
@Injectable()
export class DataServiceMock extends DataService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override getSchoolProjects(lang: string): Observable<SchoolProject[]> {
    return new Observable<SchoolProject[]>(subscriber => {
      subscriber.next(fakeSchoolProjects);
      subscriber.complete();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override getPersonalProjects(lang: string): Observable<PersonalProject[]> {
    return new Observable<PersonalProject[]>(subscriber => {
      subscriber.next(fakePersonalProjects);
      subscriber.complete();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override getWorkExperiences(lang: string): Observable<WorkExperience[]> {
    return new Observable<WorkExperience[]>(subscriber => {
      subscriber.next(fakeWorkExperiences);
      subscriber.complete();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override getAchievements(lang: string): Observable<Achievement[]> {
    return new Observable<Achievement[]>(subscriber => {
      subscriber.next(fakeAchievements);
      subscriber.complete();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override getArchivedProjects(lang: string): Observable<SchoolProject[]> {
    return new Observable<SchoolProject[]>(subscriber => {
      subscriber.next(fakeArchivedProjects);
      subscriber.complete();
    });
  }

  override getSkills(): Observable<Skills> {
    return new Observable<Skills>(subscriber => {
      subscriber.next(fakeSkills);
      subscriber.complete();
    });
  }

  override getLinks(): Observable<Link[]> {
    return new Observable<Link[]>(subscriber => {
      subscriber.next(fakeLinks);
      subscriber.complete();
    });
  }
}
