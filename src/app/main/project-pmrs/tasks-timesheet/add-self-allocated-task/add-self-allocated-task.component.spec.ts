import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSelfAllocatedTaskComponent } from './add-self-allocated-task.component';

describe('AddSelfAllocatedTaskComponent', () => {
  let component: AddSelfAllocatedTaskComponent;
  let fixture: ComponentFixture<AddSelfAllocatedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSelfAllocatedTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSelfAllocatedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
