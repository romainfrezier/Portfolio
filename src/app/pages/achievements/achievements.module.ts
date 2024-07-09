import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AchievementsComponent} from './achievements.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConstants} from '@app/app.constants';

const routes: Routes = [
  { path: '', component: AchievementsComponent },
  { path: '**', redirectTo: AppConstants.ROUTES.ERROR_404 },
];

@NgModule({
  declarations: [AchievementsComponent],
  imports: [CommonModule, TranslateModule, RouterModule.forChild(routes)],
  exports: [AchievementsComponent],
})
export class AchievementsModule {}
