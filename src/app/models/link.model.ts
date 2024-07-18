/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a social link
 */
export type Link = {
  /**
   * The display name of the link
   */
  name: string;

  /**
   * The URL to which the link points
   */
  url: string;

  /**
   * The URL or path to the icon image associated with the link
   */
  icon: string;
};
