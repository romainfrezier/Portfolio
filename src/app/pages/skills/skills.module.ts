import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsComponent} from "./skills.component";
import {SkillComponent} from "./components/skill/skill.component";
import {SkillsSectionComponent} from "./components/skills-section/skills-section.component";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    SkillsComponent,
    SkillComponent,
    SkillsSectionComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule
  ],
  exports: [
    SkillsComponent
  ]
})
export class SkillsModule {
}
