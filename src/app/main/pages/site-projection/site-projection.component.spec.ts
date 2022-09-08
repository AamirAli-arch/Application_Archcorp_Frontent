import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProjectionComponent } from './site-projection.component';

describe('SiteProjectionComponent', () => {
  let component: SiteProjectionComponent;
  let fixture: ComponentFixture<SiteProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteProjectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
