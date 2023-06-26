import {Component} from '@angular/core';
import {AppConstants} from "@app/app.constants";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

  public download_resume() {
    const document_name: string = "CV_Romain_Frezier.pdf"
    const document_url: string = "assets/files/CV_" + localStorage.getItem(AppConstants.LOCALSTORAGE.LANGUAGE) + ".pdf";
    const link: HTMLAnchorElement = document.createElement('a');
    link.download = document_name;
    link.href = document_url;
    link.click();
    link.remove();
  }
}
