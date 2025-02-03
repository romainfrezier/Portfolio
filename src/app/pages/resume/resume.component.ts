import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MinioService} from "@services/minio.service";

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
   * @param minioService
   */
  constructor(private translate: TranslateService, private minioService: MinioService) {}

  /**
   * Initiates the download of the resume PDF file.
   */
  public download_resume() {
    this.minioService.getObject('files', 'CV_' + this.translate.currentLang + '.pdf').subscribe((blob: Blob) => {
      const objectUrl: string = URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement('a');
      link.download = 'CV_Romain_Frezier.pdf';
      link.href = objectUrl;
      link.click();
      link.remove();
    });
  }
}
