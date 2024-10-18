import {Diploma} from "@models/diploma.model";

/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents an education
 */
export type Education = {
  /**
   * The positions or job titles held during the education
   */
  diplomas: Diploma[];

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
};
