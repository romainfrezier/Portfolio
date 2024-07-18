import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataService} from "@services/data.service";
import {DataServiceMock} from "@tests/mocks/data.service.mock";
import {SkillsComponent} from './skills.component';
import {SkillsSectionComponent} from "@pages/skills/components/skills-section/skills-section.component";
import {SkillComponent} from "@pages/skills/components/skill/skill.component";
import {fakeSkills} from "@tests/fake.data";

/**
 * @author Romain Frezier
 * @test
 */
describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let dataService: DataService

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [SkillsComponent, SkillsSectionComponent, SkillComponent],
      providers: [
        {provide: DataService, useClass: DataServiceMock}
      ]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SkillsComponent);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init skills', async () => {
    jest.spyOn(dataService, 'getSkills');
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(dataService.getSkills).toHaveBeenCalled()
    expect(component.programmingLanguages.length).toEqual(fakeSkills.programming_languages.length)
    expect(component.soft.length).toEqual(fakeSkills.programming_languages.length)
    expect(component.databases.length).toEqual(fakeSkills.db.length)
    expect(component.services.length).toEqual(fakeSkills.services.length)
    expect(component.webTechnologies.length).toEqual(fakeSkills.web.length)
    expect(component.softwares.length).toEqual(fakeSkills.softwares.length)
  });
});
