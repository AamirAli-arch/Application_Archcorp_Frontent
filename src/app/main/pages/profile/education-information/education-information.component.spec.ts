import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationInformationComponent } from './education-information.component';

describe('EducationInformationComponent', () => {
  let component: EducationInformationComponent;
  let fixture: ComponentFixture<EducationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
