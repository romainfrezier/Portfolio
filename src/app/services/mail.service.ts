import {Injectable} from '@angular/core';
import emailjs, {type EmailJSResponseStatus} from '@emailjs/browser';
import {environment} from "@env/environment";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Service for sending emails using EmailJS.
 */
@Injectable({
  providedIn: 'root',
})
export class MailService {
  /**
   * Sends an email using the EmailJS service.
   * @param firstName - The first name of the sender.
   * @param lastName - The last name of the sender.
   * @param email - The email address of the sender.
   * @param message - The message to be sent.
   * @returns A promise that resolves to the status of the email sending operation.
   */
  public sendEmail(firstName: string, lastName: string, email: string, message: string): Promise<EmailJSResponseStatus> {
    return emailjs.send('service_portfolio', 'template_portfolio', {
      from_name: `${firstName} ${lastName}`,
      from_email: email,
      reply_to: email,
      message,
    }, {
      publicKey: environment.EMAIL_PUBLIC_KEY,
    });
  }
}
