/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a personal project
 */
export type PersonalProject = {
  /**
   * The name of the personal project
   */
  name: string;

  /**
   * A brief description of the personal project
   */
  description: string;

  /**
   * The URL to the live project or project page
   */
  url: string;

  /**
   * The URL to the GitHub repository of the project
   */
  githubLink: string;

  /**
   * The programming languages used in the project, typically listed as a comma-separated string
   */
  languages: string;
};
