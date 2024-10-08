import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConstants} from '@app/app.constants';
import {ContactModalComponent} from "@pages/home/contact-modal/contact-modal.component";
import {SharedModule} from "@shared/shared.module";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: AppConstants.ROUTES.ERROR_404},
];

@NgModule({
  declarations: [HomeComponent, ContactModalComponent],
  imports: [CommonModule, TranslateModule, RouterModule.forChild(routes), SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {
}
