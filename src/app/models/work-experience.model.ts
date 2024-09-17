import {Position} from "@models/position.model";

/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a work experience
 */
export type WorkExperience = {
  /**
   * The skills utilized or gained during the work experience, typically listed as a comma-separated string
   */
  skills: string;

  /**
   * The location where the work experience took place
   */
  place: string;

  /**
   * The positions or job titles held during the work experiences
   */
  positions: Position[];

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
