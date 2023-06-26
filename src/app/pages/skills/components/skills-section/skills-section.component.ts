import {Component, Input} from '@angular/core';
import {Skill} from "@models/skill.model";

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss']
})
export class SkillsSectionComponent {

  @Input() public skills!: Skill[]
  @Input() public name!: string

}
