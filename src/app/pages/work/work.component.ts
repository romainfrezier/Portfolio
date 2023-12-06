import {Component} from '@angular/core';
import {AppConstants} from "@app/app.constants";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  public schoolProjects: string;
  public workExperience: string;

  constructor() {
    this.schoolProjects = AppConstants.ROUTES.SCHOOL_PROJECTS;
    this.workExperience = AppConstants.ROUTES.EXPERIENCES;
  }
}
