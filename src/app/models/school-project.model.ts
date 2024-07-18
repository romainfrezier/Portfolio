/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a school project
 */
export type SchoolProject = {
  /**
   * The name of the school project
   */
  name: string;

  /**
   * A brief description of the school project
   */
  description: string;

  /**
   * The URL to a demo or live version of the project
   */
  demoLink: string;

  /**
   * The URL to the GitHub repository of the project
   */
  githubLink: string;

  /**
   * The date period when the project was realized
   * Should be in a standard date format (e.g., 'April - June 2024')
   */
  date: string;

  /**
   * The number of people who worked on the project
   */
  number: number;

  /**
   * The programming languages used in the project, typically listed as a comma-separated string
   */
  languages: string;

  /**
   * The URL to a document related to the project, such as a report or presentation
   */
  documentUrl: string;
};
