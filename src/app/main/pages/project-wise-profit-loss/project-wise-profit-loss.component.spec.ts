import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWiseProfitLossComponent } from './project-wise-profit-loss.component';

describe('ProjectWiseProfitLossComponent', () => {
  let component: ProjectWiseProfitLossComponent;
  let fixture: ComponentFixture<ProjectWiseProfitLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWiseProfitLossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWiseProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
