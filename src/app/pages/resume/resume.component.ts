import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays the resume page, allowing to download my resume
 */
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  /**
   * @constructor
   * @param translate - Service to handle translations.
   */
  constructor(private translate: TranslateService) {}

  /**
   * Initiates the download of the resume PDF file.
   */
  public download_resume() {
    const document_name = 'CV_Romain_Frezier.pdf';
    const document_url: string = 'https://api.minio.romainfrezier.com/files/CV_' + this.translate.currentLang + '.pdf';
    const link: HTMLAnchorElement = document.createElement('a');
    link.download = document_name;
    link.href = document_url;
    link.click();
    link.remove();
  }
}
