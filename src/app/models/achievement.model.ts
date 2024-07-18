/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents an achievement
 */
export type Achievement = {
  /**
   * The name of the achievement
   */
  name: string;

  /**
   * A brief description of the achievement
   */
  description: string;

  /**
   * The URL or path to the badge image associated with the achievement
   */
  badge: string;

  /**
   * A link related to the achievement, which could be to more information or related content
   */
  link: string;

  /**
   * The display name of the link
   */
  linkName: string;
};
