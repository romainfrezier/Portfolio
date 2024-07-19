/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a work experience
 */
export type WorkExperience = {
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
   * The skills utilized or gained during the work experience, typically listed as a comma-separated string
   */
  skills: string;

  /**
   * The location where the work experience took place
   */
  place: string;

  /**
   * The position or job title held during the work experience
   */
  position: string;

  /**
   * The name of the company where the work experience took place
   */
  company: string;

  /**
   * The URL to the company's website
   */
  companyUrl: string;

  /**
   * The URL or path to the company's logo image
   */
  companyLogo: string;
};
