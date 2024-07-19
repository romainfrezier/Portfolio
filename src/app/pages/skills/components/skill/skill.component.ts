import {Component, Input} from '@angular/core';
import {Skill} from '@models/skill.model';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a skill, with its name, link and icon
 */
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent {
  /**
   * The skill object to be displayed by this component.
   * @required
   */
  @Input() public skill!: Skill;
}
