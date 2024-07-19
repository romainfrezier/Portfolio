import {Injectable} from '@angular/core';
import {MailService} from "@services/mail.service";
import {EmailJSResponseStatus} from "@emailjs/browser";

/**
 * @author Romain Frezier
 * @service
 * @description
 * Mock service for testing purposes, extending the MailService to provide mock data.
 */
@Injectable()
export class MailServiceMock extends MailService {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override sendEmail(firstName: string, lastName: string, email: string, message: string): Promise<EmailJSResponseStatus> {
    return Promise.resolve({status: 200, text: 'OK'});
  }
}
