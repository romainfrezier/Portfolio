import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillComponent} from './skill.component';
import {fakeSkills} from "@tests/fake.data";

describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [SkillComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
    component.skill = fakeSkills.db[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skill name', () => {
    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const anchor: HTMLAnchorElement = compiled.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toBe(fakeSkills.db[0].name);
    expect(anchor.href).toBe(fakeSkills.db[0].link + "/");
  });

  it('should update the view when skill input changes', () => {
    component.skill = fakeSkills.web[0];
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const anchor: HTMLAnchorElement = compiled.querySelector('a') as HTMLAnchorElement;

    expect(anchor.textContent).toBe(fakeSkills.web[0].name);
    expect(anchor.href).toBe(fakeSkills.web[0].link + "/");

    component.skill = fakeSkills.programming_languages[0];
    fixture.detectChanges();
    expect(anchor.textContent).toBe(fakeSkills.programming_languages[0].name);
    expect(anchor.href).toBe(fakeSkills.programming_languages[0].link + "/");
  });
});
