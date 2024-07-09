import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SchoolProjectsComponent} from './school-projects/school-projects.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AppConstants} from '@app/app.constants';
import {WorkExperiencesComponent} from './experience/work-experiences.component';

const routes: Routes = [
  { path: '', redirectTo: AppConstants.ROUTES.EXPERIENCES, pathMatch: 'full' },
  {
    path: AppConstants.ROUTES.SCHOOL_PROJECTS,
    component: SchoolProjectsComponent,
  },
  {
    path: AppConstants.ROUTES.EXPERIENCES,
    component: WorkExperiencesComponent,
  },
  { path: '**', redirectTo: AppConstants.ROUTES.ERROR_404 },
];

@NgModule({
  declarations: [SchoolProjectsComponent, WorkExperiencesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class WorkModule {}
