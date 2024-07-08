import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsComponent} from './skills.component';
import {SkillComponent} from './components/skill/skill.component';
import {SkillsSectionComponent} from './components/skills-section/skills-section.component';
import {SharedModule} from '@shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConstants} from '@app/app.constants';

const routes: Routes = [
  { path: '', component: SkillsComponent },
  { path: '**', redirectTo: AppConstants.ROUTES.ERROR_404 },
];

@NgModule({
  declarations: [SkillsComponent, SkillComponent, SkillsSectionComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [SkillsComponent],
})
export class SkillsModule {}
