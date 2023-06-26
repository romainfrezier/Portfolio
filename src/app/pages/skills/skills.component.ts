import {Component, OnInit} from '@angular/core';
import {Skill} from "@models/skill.model";
import {DataService} from "@services/data.service";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  public programmingLanguages: Skill[]
  public webTechnologies: Skill[]
  public databases: Skill[]
  public softwares: Skill[]
  public services: Skill[]

  constructor(private dataService: DataService) {
    this.programmingLanguages = []
    this.webTechnologies = []
    this.databases = []
    this.softwares = []
    this.services = []
  }

  ngOnInit(): void {
    this.dataService.getSkills().subscribe((skills: any): void => {
      this.programmingLanguages = skills.programming_languages
      this.webTechnologies = skills.web
      this.databases = skills.db
      this.softwares = skills.soft
      this.services = skills.services
    })
  }

}
