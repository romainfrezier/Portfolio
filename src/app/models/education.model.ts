/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents an education
 */
export type Education = {
  /**
   * The name of the school where the education took place
   */
  school: string;

  /**
   * The URL to the school's website
   */
  schoolUrl: string;

  /**
   * The URL or path to the school's logo image
   */
  schoolLogo: string;

  /**
   * A brief description of the diploma
   */
  description: string;

  /**
   * The location where the diploma took place
   */
  place: string;

  /**
   * The date or period of the diploma
   * Should be in a standard date format (e.g., 'April - June 2024')
   */
  date: string;

  /**
   * The skills utilized or gained during the education, typically listed as a comma-separated string
   */
  skills: string;
};
