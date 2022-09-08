import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectLevelCommentsComponent } from './view-project-level-comments.component';

describe('ViewProjectLevelCommentsComponent', () => {
  let component: ViewProjectLevelCommentsComponent;
  let fixture: ComponentFixture<ViewProjectLevelCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectLevelCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectLevelCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
