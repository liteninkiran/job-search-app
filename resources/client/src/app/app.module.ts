import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobTypesComponent } from './components/job-types/job-types.component';
import { JobTypeEditComponent } from './components/job-type-edit/job-type-edit.component';

const appRoutes: Routes = [
    { path: '', component: JobTypesComponent },
    { path: 'edit/:id', component: JobTypeEditComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        JobTypesComponent,
        NavbarComponent,
        JobTypeEditComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
