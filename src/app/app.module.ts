import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ThemesService} from "./services/themes.service";
import {DataService} from "./services/data.service";
import {AboutModule} from "./pages/about/about.module";
import {SkillsModule} from "./pages/skills/skills.module";
import {SharedModule} from "./shared/shared.module";
import {AchievementsModule} from "./pages/achievements/achievements.module";
import {HomeModule} from "./pages/home/home.module";
import {ProjectsModule} from "./pages/projects/projects.module";
import {ResumeModule} from "./pages/resume/resume.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    AboutModule,
    AchievementsModule,
    ProjectsModule,
    SkillsModule,
    ResumeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ThemesService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
