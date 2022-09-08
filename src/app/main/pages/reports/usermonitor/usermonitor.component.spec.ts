import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermonitorComponent } from './usermonitor.component';

describe('UsermonitorComponent', () => {
  let component: UsermonitorComponent;
  let fixture: ComponentFixture<UsermonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
