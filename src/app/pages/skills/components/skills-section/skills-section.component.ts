import {Component, Input} from '@angular/core';
import {Skill} from '@models/skill.model';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a skill sections
 */
@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss'],
})
export class SkillsSectionComponent {
  /**
   * The list of skills to be displayed in this section.
   * @required
   */
  @Input() public skills!: Skill[];
  /**
   * The name of the skills section.
   * @required
   */
  @Input() public name!: string;
}
