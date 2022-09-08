import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LoaderSpinerComponent } from 'app/main/pages/loader-spiner/loader-spiner.component';
import { EmployeeDropdownComponent } from 'app/main/pages/employee-dropdown/employee-dropdown.component';
import { ProjectDropdownComponent } from 'app/main/pages/project-dropdown/project-dropdown.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ResourceDropdownComponent } from 'app/main/pages/resource-dropdown/resource-dropdown.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';



/**
 * Custom angular notifier options
 */
 const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'right',
              distance: 12
          },
          vertical: {
              position: 'top',
              distance: 12,
              gap: 10
          }
      },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };
@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        MatToolbarModule,
        MatTooltipModule,
        FuseDirectivesModule,
        FusePipesModule,
        RouterModule,
        FlexLayoutModule,
       
        MatButtonModule,
      
        MatCardModule,
        MatCheckboxModule,
      
        MatDatepickerModule,
        MatDialogModule,
      
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        //MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        NgxMatSelectSearchModule,
        NotifierModule.withConfig(customNotifierOptions)
    ],
    exports  : [
        NotifierModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTooltipModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        FusePipesModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        MatToolbarModule,
        MatTooltipModule,
        FusePipesModule,
        RouterModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        //MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        LoaderSpinerComponent,
      
        EmployeeDropdownComponent,
        ProjectDropdownComponent,
        NgxMatSelectSearchModule,
        ResourceDropdownComponent
    ],
    declarations: [LoaderSpinerComponent,EmployeeDropdownComponent, ProjectDropdownComponent,ResourceDropdownComponent],
})
export class FuseSharedModule{
}
 