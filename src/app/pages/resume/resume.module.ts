import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {ResumeComponent} from "./resume.component";


@NgModule({
  declarations: [
    ResumeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ResumeComponent
  ]
})
export class ResumeModule {
}
