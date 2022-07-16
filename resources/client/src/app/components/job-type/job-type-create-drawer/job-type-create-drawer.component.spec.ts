import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeCreateDrawerComponent } from './job-type-create-drawer.component';

describe('JobTypeCreateDrawerComponent', () => {
    let component: JobTypeCreateDrawerComponent;
    let fixture: ComponentFixture<JobTypeCreateDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ JobTypeCreateDrawerComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(JobTypeCreateDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
