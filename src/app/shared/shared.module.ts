import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {LoaderComponent} from './components/loader/loader.component';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {SafePipe} from '@pipes/safe.pipe';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, LoaderComponent, SafePipe, FooterComponent],
  imports: [CommonModule, TranslateModule, MatIconModule, RouterModule],
  exports: [HeaderComponent, LoaderComponent, FooterComponent, SafePipe],
})
export class SharedModule {}
