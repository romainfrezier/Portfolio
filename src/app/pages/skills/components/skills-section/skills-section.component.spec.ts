import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SkillsSectionComponent} from './skills-section.component';
import {SkillComponent} from "@pages/skills/components/skill/skill.component";
import {fakeSkills} from "@tests/fake.data";

/**
 * @author Romain Frezier
 * @test
 */
describe('SkillsSectionComponent', () => {
  let component: SkillsSectionComponent;
  let fixture: ComponentFixture<SkillsSectionComponent>;
  const sectionName1: string = "Section 1";
  const sectionName2: string = "Section 2";

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [SkillsSectionComponent, SkillComponent],
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SkillsSectionComponent);
    component = fixture.componentInstance;
    component.name = sectionName1;
    component.skills = fakeSkills.db;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skill section', () => {
    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const sectionTitle: HTMLHeadingElement = compiled.querySelector('h2') as HTMLHeadingElement;
    expect(sectionTitle.textContent).toBe("skills." + sectionName1);
  });

  it('should update the view when input changes', () => {
    const compiled: HTMLElement = fixture.nativeElement as HTMLElement;
    const sectionTitle: HTMLHeadingElement = compiled.querySelector('h2') as HTMLHeadingElement;
    expect(sectionTitle.textContent).toBe("skills." + sectionName1);

    component.name = sectionName2;
    fixture.detectChanges();
    expect(sectionTitle.textContent).toBe("skills." + sectionName2);
  });
});
