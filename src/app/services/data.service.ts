import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Achievement} from "../models/achievement.model";
import {Project} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  public getProjects(lang: string): Observable<Project[]> {
    return this.http.get<Project[]>(`./assets/data/${lang}/projects.json`)
  }

  public getAchievements(lang: string): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`./assets/data/${lang}/achievements.json`)
  }

  public getArchivedProjects(lang: string): Observable<Project[]> {
    return this.http.get<Project[]>(`./assets/data/${lang}/archived-projects.json`)
  }
}
