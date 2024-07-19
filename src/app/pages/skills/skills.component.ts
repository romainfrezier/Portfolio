import {Component, OnInit} from '@angular/core';
import {Skill} from '@models/skill.model';
import {DataService} from '@services/data.service';
import {Skills} from '@models/skills.model';

/**
 * @author Romain Frezier
 * @component
 * @description
 * This component displays different skill sections
 */
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  /**
   * List of programming languages skills.
   */
  public programmingLanguages: Skill[];
  /**
   * List of web technologies skills.
   */
  public webTechnologies: Skill[];
  /**
   * List of database skills.
   */
  public databases: Skill[];
  /**
   * List of software skills.
   */
  public softwares: Skill[];
  /**
   * List of soft skills.
   */
  public soft: Skill[];
  /**
   * List of service-related skills.
   */
  public services: Skill[];

  /**
   * @constructor
   * @param dataService - Service to fetch skills data.
   */
  constructor(private dataService: DataService) {
    this.programmingLanguages = [];
    this.webTechnologies = [];
    this.databases = [];
    this.softwares = [];
    this.soft = [];
    this.services = [];
  }

  /**
   * Load skills on initialization
   */
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
