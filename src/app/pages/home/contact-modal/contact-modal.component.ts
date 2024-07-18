import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MailService} from "@services/mail.service";
import {EmailJSResponseStatus} from "@emailjs/browser";
import {ToastService} from "@services/toast.service";
import {TranslateService} from "@ngx-translate/core";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss'
})
export class ContactModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<void>;

  public contactForm: FormGroup;
  public modalShown: boolean;
  public loading: boolean;

  private toastMessage: string;

  constructor(private formBuilder: FormBuilder,
              private mailService: MailService,
              private toastService: ToastService,
              private translate: TranslateService,
  ) {
    this.closeModal = new EventEmitter<void>();
    this.modalShown = false;
    this.loading = false;
    this.toastMessage = "";
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
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

  public closeModalWithAnimation(): void {
    this.modalShown = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
