/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a work experience position
 */
export type Position = {
  /**
   * A brief description of the work experience
   */
  description: string;

  /**
   * The date or period of the work experience
   * Should be in a standard date format (e.g., 'April - June 2024')
   */
  date: string;

  /**
   * The position or job title held during the work experience
   */
  position: string;
};
