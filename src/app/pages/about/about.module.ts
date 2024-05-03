import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from "./about.component";
import {SharedModule} from "@shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule, Routes} from "@angular/router";
import {AppConstants} from "@app/app.constants";
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const routes: Routes = [
  {path: '', component: AboutComponent},
  {path: '**', redirectTo: AppConstants.ROUTES.ERROR_404}
];

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {
}
