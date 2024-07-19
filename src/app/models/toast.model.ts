/**
 * @author Romain Frezier
 * @model
 * @description
 * Represents a toast notification
 */
export type Toast = {
  /**
   * The message to be displayed in the toast notification
   */
  message: string;

  /**
   * The type of the toast notification, which determines its style
   * Can be 'success', 'error', or 'info'
   * @see AppConstants
   */
  type: 'success' | 'error' | 'info';
};
