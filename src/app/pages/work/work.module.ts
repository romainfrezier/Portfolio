import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolProjectsComponent} from "./components/school-projects/school-projects.component";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AppConstants} from "@app/app.constants";
import {WorkComponent} from './work.component';
import {WorkExperiencesComponent} from './components/experience/work-experiences.component';

const routes: Routes = [
  {path: '', component: WorkComponent},
  {path: AppConstants.ROUTES.SCHOOL_PROJECTS, component: SchoolProjectsComponent},
  {path: AppConstants.ROUTES.EXPERIENCES, component: WorkExperiencesComponent},
  {path: '**', redirectTo: AppConstants.ROUTES.ERROR_404}
];

@NgModule({
  declarations: [
    SchoolProjectsComponent,
    WorkComponent,
    WorkExperiencesComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    WorkComponent
  ]
})
export class WorkModule {
}
