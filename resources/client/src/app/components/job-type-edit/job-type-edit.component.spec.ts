import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeEditComponent } from './job-type-edit.component';

describe('JobTypeEditComponent', () => {
  let component: JobTypeEditComponent;
  let fixture: ComponentFixture<JobTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
