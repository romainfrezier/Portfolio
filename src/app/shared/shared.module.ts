import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LoaderComponent} from './components/loader/loader.component';
import {TranslateModule} from '@ngx-translate/core';
import {SafePipe} from '@pipes/safe.pipe';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';
import {ToastComponent} from "@shared/components/toast/toast.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [HeaderComponent, LoaderComponent, SafePipe, FooterComponent, ToastComponent],
  imports: [CommonModule, TranslateModule, RouterModule, ReactiveFormsModule],
  exports: [HeaderComponent, LoaderComponent, FooterComponent, ToastComponent, SafePipe, ReactiveFormsModule],
})
export class SharedModule {}
