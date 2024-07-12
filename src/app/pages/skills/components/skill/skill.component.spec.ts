import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillComponent} from './skill.component';

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillComponent],
    });
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;

    component.skill  = {
      id: 1,
      name: 'Mock Skill',
      src: 'mock-src',
      link: ''
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
