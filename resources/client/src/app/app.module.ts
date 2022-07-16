import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'ag-grid-enterprise';
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_GB } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobTypesComponent } from './components/job-type/job-types/job-types.component';
import { JobTypeEditComponent } from './components/job-type/job-type-edit/job-type-edit.component';
import { JobTypeCreateComponent } from './components/job-type/job-type-create/job-type-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActionButtonComponent } from './components/button/action-button.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';

const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'job_types', component: JobTypesComponent },
];

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
    declarations: [
        DateAgoPipe,
        AppComponent,
        NavbarComponent,
        JobTypesComponent,
        DashboardComponent,
        ActionButtonComponent,
        JobTypeEditComponent,
        JobTypeCreateComponent,
    ],
    imports: [
        FormsModule,
        AgGridModule,
        BrowserModule,
        HttpClientModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_GB },
        { provide: NZ_ICONS, useValue: icons },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
