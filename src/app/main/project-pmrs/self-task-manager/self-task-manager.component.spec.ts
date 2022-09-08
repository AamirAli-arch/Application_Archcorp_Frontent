import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfTaskManagerComponent } from './self-task-manager.component';

describe('SelfTaskManagerComponent', () => {
  let component: SelfTaskManagerComponent;
  let fixture: ComponentFixture<SelfTaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfTaskManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfTaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
