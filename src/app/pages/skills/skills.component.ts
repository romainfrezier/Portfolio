import {Component, OnInit} from '@angular/core';
import {Skill} from '@models/skill.model';
import {DataService} from '@services/data.service';
import {Skills} from '@models/skills.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  public programmingLanguages: Skill[];
  public webTechnologies: Skill[];
  public databases: Skill[];
  public softwares: Skill[];
  public soft: Skill[];
  public services: Skill[];

  constructor(private dataService: DataService) {
    this.programmingLanguages = [];
    this.webTechnologies = [];
    this.databases = [];
    this.softwares = [];
    this.soft = [];
    this.services = [];
  }

  ngOnInit(): void {
    this.dataService.getSkills().subscribe((skills: Skills): void => {
      this.programmingLanguages = skills.programming_languages;
      this.webTechnologies = skills.web;
      this.databases = skills.db;
      this.softwares = skills.softwares;
      this.soft = skills.soft;
      this.services = skills.services;
    });
  }
}
