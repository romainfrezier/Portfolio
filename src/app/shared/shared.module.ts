import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {SafePipe} from "@pipes/safe.pipe";


@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    SafePipe
  ]
})
export class SharedModule { }
