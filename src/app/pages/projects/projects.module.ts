import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsComponent} from "./projects.component";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AppConstants} from "@app/app.constants";

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: '**', redirectTo: AppConstants.ROUTES.ERROR_404}
];

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule {
}
