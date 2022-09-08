import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { ChartsModule } from 'app/main/charts/charts.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../app/services/auth/token.interceptor'
import { AuthGuard } from 'app/main/guards/auth.guard';
import { ExternalUrlGuard } from './main/guards/external-url.guard';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



//Lazy loading modules to be added below.
const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'login',
        loadChildren: () => import('./main/login/login.module').then(m => m.LoginModule)
    },
    {
        path        : 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'authorities',
        loadChildren: () => import('./main/authorities/authorities-submission/authorities-submission.module').then(m => m.AuthoritiesSubmissionModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'award-project',
        loadChildren: () => import('./main/award-project/award-project.module').then(m => m.AwardProjectModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'budgetedhours',
        loadChildren: () => import('./main/budgetedhours/budgetedhours.module').then(m => m.BudgetedhoursModule),
        canActivate: [AuthGuard]
    },
    {
        path        : 'document-management',
        loadChildren: () => import('./main/document-management/document-management.module').then(m => m.DocumentManagementModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'charts',
        loadChildren: () => import('./main/charts/charts.module').then(m => m.ChartsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'acc-bim',
        loadChildren: () => import('./main/acc-bim/acc-bim.module').then(m => m.AccBimModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'project-dashboard',
        loadChildren: () => import('./main/project-dashboard/project-dashboard.module').then(m => m.ProjectDashboardModule),
        canActivate: [AuthGuard]
    },
    // Added On 25/05/0222
    {
        path: 'project-notes',
        loadChildren: () => import('./main/pages/project-notes/project-notes.module').then(m => m.ProjectNotesModule),
        canActivate: [AuthGuard]
    },

    {
        path: 'project-matrix-element',
        loadChildren: () => import('./main/project-matrix-element/project-matrix-element.module').then(m => m.ProjectMatrixElementModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'employee-registration',
        loadChildren: () => import('./main/employee-registration/employee-registration.module').then(m => m.EmployeeRegistrationModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'staff-info',
        loadChildren: () => import('./main/staff-info/staff-info.module').then(m => m.StaffInfoModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'project-pmrs',
        loadChildren: () => import('./main/project-pmrs/project-pmrs.module').then(m => m.ProjectPmrsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'external',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.238:8051/'
        }
    },
    {
        path: 'external1',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.238:8050/'
        }
    },
    { 
        path: 'external2',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.15:801/'
        }
    },
    {
        path: 'external3',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.15:802//Home/Index'
        }
    },
    {
        path: 'external4',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.15:832/IVBPlanner/PlanningIndex'
        }
    },
    {
        path: 'external5',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.15:801/ProjectRoom/ProjectHome'
        }
    },
    {
        path: 'external6',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.238:4001/'
        }
    },
    {
        path: 'external7',
        canActivate: [ExternalUrlGuard],
        component: ExternalUrlGuard,
        data: {
          externalUrl: 'http://192.168.6.15:801/TimeSheet/'
        }
    }
];

@NgModule({
    declarations: [
        AppComponent,
      
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        MatSelectModule,
        MatFormFieldModule,
        // NgxMatSelectSearchModule,
       // GanttChart
       
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ExternalUrlGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class AppModule {
}