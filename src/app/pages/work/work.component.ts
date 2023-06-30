import {Component} from '@angular/core';
import {AppConstants} from "@app/app.constants";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  public personalProjects: string;
  public schoolProjects: string;
  public workExperience: string;

  constructor() {
    this.personalProjects = AppConstants.ROUTES.PERSONAL_PROJECTS;
    this.schoolProjects = AppConstants.ROUTES.SCHOOL_PROJECTS;
    this.workExperience = AppConstants.ROUTES.EXPERIENCES;
  }
}
