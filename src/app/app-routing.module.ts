import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppConstants} from "@app/app.constants";

const routes: Routes = [
  { path: AppConstants.ROUTES.ABOUT, loadChildren: () => import('@pages/about/about.module').then(m => m.AboutModule) },
  { path: AppConstants.ROUTES.RESUME, loadChildren: () => import('@pages/resume/resume.module').then(m => m.ResumeModule) },
  { path: AppConstants.ROUTES.ACHIEVEMENTS, loadChildren: () => import('@pages/achievements/achievements.module').then(m => m.AchievementsModule) },
  { path: AppConstants.ROUTES.WORK, loadChildren: () => import('@pages/work/work.module').then(m => m.WorkModule) },
  { path: AppConstants.ROUTES.SKILLS, loadChildren: () => import('@pages/skills/skills.module').then(m => m.SkillsModule) },
  { path: AppConstants.ROUTES.ERROR, loadChildren: () => import('@pages/error/error.module').then(m => m.ErrorModule) },
  { path: AppConstants.ROUTES.HOME, loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule) },
  { path: '', redirectTo: AppConstants.ROUTES.HOME, pathMatch: 'full' },
  { path: '**', redirectTo: AppConstants.ROUTES.ERROR_404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
