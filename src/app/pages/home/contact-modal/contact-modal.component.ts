import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MailService} from "@services/mail.service";
import {EmailJSResponseStatus} from "@emailjs/browser";

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss'
})
export class ContactModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<void>;

  public contactForm: FormGroup;
  public modalShown: boolean;

  constructor(private formBuilder: FormBuilder, private mailService: MailService) {
    this.closeModal = new EventEmitter<void>();
    this.modalShown = false;
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    setTimeout((): void => {
      this.modalShown = true;
    }, 10);
  }

  public onBackdropClick(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('contact-modal-backdrop')) {
      this.closeModalWithAnimation();
    }
  }

  public onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.mailService.sendEmail(formData.firstName, formData.name, formData.email, formData.message)
        .then((response: EmailJSResponseStatus): void => {
          if (response.status !== 200) {
            alert('An error occurred while sending the email'); // TODO : add a toast
          } else {
            alert('Email sent successfully'); // TODO : add a toast
          }
        })
        .catch((): void => {
          alert('An error occurred while sending the email'); // TODO : add a toast
        });
      this.closeModalWithAnimation();
    }
  }

  public closeModalWithAnimation(): void {
    this.modalShown = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
