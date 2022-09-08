import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceInformationComponent } from './experience-information.component';

describe('ExperienceInformationComponent', () => {
  let component: ExperienceInformationComponent;
  let fixture: ComponentFixture<ExperienceInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
