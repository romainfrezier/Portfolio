import {TestBed} from '@angular/core/testing';
import {MailService} from './mail.service';
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {environment} from "@env/environment";

describe('MailService', () => {
  let service: MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailService]
    });
    service = TestBed.inject(MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send email', async () => {
    const mockResponse: EmailJSResponseStatus = { status: 200, text: 'OK' };
    jest.spyOn(emailjs, 'send').mockResolvedValue(mockResponse);

    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const message = 'Hello, this is a test message.';

    const result = await service.sendEmail(firstName, lastName, email, message);

    expect(result).toEqual(mockResponse);
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_portfolio',
      'template_portfolio',
      {
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        reply_to: email,
        message,
      },
      {
        publicKey: environment.EMAIL_PUBLIC_KEY,
      }
    );
  });

  it('should handle email send failure', async () => {
    const mockError: Error = new Error('Email send failed');
    jest.spyOn(emailjs, 'send').mockRejectedValue(mockError);

    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const message = 'Hello, this is a test message.';

    await expect(service.sendEmail(firstName, lastName, email, message)).rejects.toThrow('Email send failed');
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_portfolio',
      'template_portfolio',
      {
        from_name: `${firstName} ${lastName}`,
        from_email: email,
        reply_to: email,
        message,
      },
      {
        publicKey: environment.EMAIL_PUBLIC_KEY,
      }
    );
  });
});
