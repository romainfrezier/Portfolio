import {Skill} from '@models/skill.model';

/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a collection of skills categorized by type
 */
export type Skills = {
  /**
   * A list of skills related to programming languages
   */
  programming_languages: Skill[];

  /**
   * A list of skills related to web development
   */
  web: Skill[];

  /**
   * A list of skills related to databases
   */
  db: Skill[];

  /**
   * A list of skills related to software tools
   */
  softwares: Skill[];

  /**
   * A list of skills related to services
   */
  services: Skill[];

  /**
   * A list of soft skills
   */
  soft: Skill[];
};
