import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkExperiencesComponent} from './work-experiences.component';

describe('ExperienceComponent', () => {
  let component: WorkExperiencesComponent;
  let fixture: ComponentFixture<WorkExperiencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkExperiencesComponent],
    });
    fixture = TestBed.createComponent(WorkExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
