import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeCreateComponent } from './job-type-create.component';

describe('JobTypeCreateComponent', () => {
  let component: JobTypeCreateComponent;
  let fixture: ComponentFixture<JobTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
