import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MailService} from "@services/mail.service";
import {EmailJSResponseStatus} from "@emailjs/browser";
import {ToastService} from "@services/toast.service";
import {TranslateService} from "@ngx-translate/core";
import {lastValueFrom} from "rxjs";

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays a contact modal, with a form to send an email
 */
@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss'
})
export class ContactModalComponent implements OnInit {
  /**
   * Event emitter to close the modal.
   */
  @Output() closeModal: EventEmitter<void>;

  /**
   * Form group for the contact form.
   */
  public contactForm: FormGroup;
  /**
   * Indicates if the modal is currently shown.
   */
  public modalShown: boolean;
  /**
   * Indicates if a form submission is in progress.
   */
  public loading: boolean;

  /**
   * Message to be shown in the toast notification.
   */
  private toastMessage: string;

  /**
   * @constructor
   * @param formBuilder - Service to build the form group.
   * @param mailService - Service to send emails.
   * @param toastService - Service to show toast notifications.
   * @param translate - Service to handle translations.
   */
  constructor(private formBuilder: FormBuilder,
              private mailService: MailService,
              private toastService: ToastService,
              private translate: TranslateService,
  ) {
    this.closeModal = new EventEmitter<void>();
    this.modalShown = false;
    this.loading = false;
    this.toastMessage = "";

    // Initialize the contact form with validation rules.
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  /**
   * Lifecycle hook that is called on initialization to show the modal after 10 ms
   */
  public ngOnInit(): void {
    setTimeout((): void => {
      this.modalShown = true;
    }, 10);
  }

  /**
   * Handles click events on the backdrop to close the modal.
   * @param event - The click event.
   */
  public onBackdropClick(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('contact-modal-backdrop')) {
      this.closeModalWithAnimation();
    }
  }

  /**
   * Handles the form submission.
   */
  public async onSubmit(): Promise<void> {
    this.loading = true;
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      try {
        const response: EmailJSResponseStatus = await this.mailService.sendEmail(formData.firstName, formData.name, formData.email, formData.message);
        if (response.status === 200) {
          this.toastMessage = await lastValueFrom(this.translate.get("contact-form.success"));
          this.toastService.showSuccess(this.toastMessage);
        } else {
          this.toastMessage = await lastValueFrom(this.translate.get("contact-form.error"));
          this.toastService.showError(this.toastMessage);
        }
      } catch (error) {
        this.toastMessage = await lastValueFrom(this.translate.get("contact-form.error"));
        this.toastService.showError(this.toastMessage);
      }
    }

    this.loading = false;
    this.closeModalWithAnimation();
  }

  /**
   * Closes the modal with an animation and emits the close event.
   */
  public closeModalWithAnimation(): void {
    this.modalShown = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
