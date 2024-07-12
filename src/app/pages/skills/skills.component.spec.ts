import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillsComponent} from './skills.component';
import {SkillsSectionComponent} from "@pages/skills/components/skills-section/skills-section.component";

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsComponent, SkillsSectionComponent],
    });
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
