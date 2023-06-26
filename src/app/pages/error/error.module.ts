import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorComponent} from './error.component';
import {AppConstants} from "@app/app.constants";
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {path: AppConstants.ROUTES._404, component: ErrorComponent},
  {path: '**', redirectTo: AppConstants.ROUTES.ERROR_404}
];

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ]
})
export class ErrorModule { }
