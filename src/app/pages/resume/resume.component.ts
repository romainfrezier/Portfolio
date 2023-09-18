import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

  constructor(private translate: TranslateService) {}

  public download_resume() {
    const document_name: string = "CV_Romain_Frezier.pdf"
    const document_url: string = "assets/files/CV_" + this.translate.currentLang + ".pdf";
    const link: HTMLAnchorElement = document.createElement('a');
    link.download = document_name;
    link.href = document_url;
    link.click();
    link.remove();
  }
}
