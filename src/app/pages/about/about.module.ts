import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from "./about.component";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule
  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {
}
