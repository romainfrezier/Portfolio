import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SchoolProjectsComponent} from './school-projects.component';

describe('ProjectsComponent', () => {
  let component: SchoolProjectsComponent;
  let fixture: ComponentFixture<SchoolProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolProjectsComponent]
    });
    fixture = TestBed.createComponent(SchoolProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
