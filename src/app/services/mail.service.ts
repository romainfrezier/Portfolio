import {Injectable} from '@angular/core';
import emailjs, {type EmailJSResponseStatus} from '@emailjs/browser';
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root',
})
export class MailService {
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
