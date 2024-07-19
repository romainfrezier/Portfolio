/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a skill
 */
export type Skill = {
  /**
   * The unique identifier for the skill
   */
  id: number;

  /**
   * The name of the skill
   */
  name: string;

  /**
   * The URL or path to an image or icon representing the skill
   */
  src: string;

  /**
   * An optional link related to the skill, which could be to more information or related content
   * Can be null if no link is available
   */
  link: string | null;
};
