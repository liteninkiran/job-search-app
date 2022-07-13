import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeEditDrawerComponent } from './job-type-edit-drawer.component';

describe('JobTypeEditDrawerComponent', () => {
  let component: JobTypeEditDrawerComponent;
  let fixture: ComponentFixture<JobTypeEditDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTypeEditDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTypeEditDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
