import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobTypesComponent } from './components/job-types/job-types.component';
import { JobTypeEditComponent } from './components/job-type-edit/job-type-edit.component';
import { JobTypeCreateComponent } from './components/job-type-create/job-type-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditButtonComponent } from './components/button/edit-button/edit-button.component';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'job_types', component: JobTypesComponent },
    { path: 'job_types/edit/:id', component: JobTypeEditComponent },
    { path: 'job_types/create', component: JobTypeCreateComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        JobTypesComponent,
        DashboardComponent,
        JobTypeEditComponent,
        JobTypeCreateComponent,
        EditButtonComponent,
    ],
    imports: [
        FormsModule,
        AgGridModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
