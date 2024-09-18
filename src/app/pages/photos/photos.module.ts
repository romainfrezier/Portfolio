import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotosComponent} from "@pages/photos/photos.component";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule, Routes} from "@angular/router";
import {AppConstants} from "@app/app.constants";
import {PhotoModalComponent} from "@pages/photos/photo-modal/photo-modal.component";

const routes: Routes = [
  { path: '', component: PhotosComponent },
  { path: '**', redirectTo: AppConstants.ROUTES.ERROR_404 },
];

@NgModule({
  declarations: [PhotosComponent, PhotoModalComponent],
  imports: [CommonModule, TranslateModule, RouterModule.forChild(routes)],
  exports: [PhotosComponent],
})
export class PhotosModule { }
