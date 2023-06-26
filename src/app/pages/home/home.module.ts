import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule, Routes} from "@angular/router";
import {AppConstants} from "@app/app.constants";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: AppConstants.ROUTES.ERROR_404}
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
