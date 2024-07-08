import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ResumeComponent} from './resume.component';
import {RouterModule, Routes} from '@angular/router';
import {AppConstants} from '@app/app.constants';

const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: '**', redirectTo: AppConstants.ROUTES.ERROR_404 },
];

@NgModule({
  declarations: [ResumeComponent],
  imports: [CommonModule, TranslateModule, RouterModule.forChild(routes)],
  exports: [ResumeComponent],
})
export class ResumeModule {}
