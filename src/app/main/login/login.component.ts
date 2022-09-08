import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { fuseAnimations } from '@fuse/animations';
import { UserLogin } from './models/user-login';
import { AuthService } from './services/auth.service';
import { LoginResponse } from './models/loginResponse';
import { routerReducer } from '@ngrx/router-store';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginResponse: LoginResponse;
    errorMessage: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _fuseNavigationService: FuseNavigationService,
        private _authService: AuthService,
        public router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    authenticate() {
        let user = new UserLogin();
        user.UserName = this.loginForm.value.email;
        user.Password = this.loginForm.value.password;
        this._authService.authenticate(user).subscribe(resp => {
            localStorage.setItem('token', resp.token);
            const redirect = this.getCurrentUserId();
            if(redirect){
                this.router.navigate(['pages/projects']);
            }else{
                this.router.navigate(['/apps/todo']);
            }

        },
            error => {
                this.errorMessage = error.error.errorMessage;
            }
        );


    }


    getCurrentUserId() {
        const token = localStorage.getItem("token");
        let result = false;
        if (token != null) {
            const parsed = JSON.parse(atob(token.split('.')[1]));
            let allowed : string[] = ['1','18','22','35', '14', '31','20','23','2','49','19','17','27','3', '8', '45', '47', '52'];
            let reports : string[] = ['1','18','22','35', '45', '47', '52'];
            let finance : string[] = ['20','22','45','18','85'];
            let financeDataEntry : string[] = ['45','20'];       
               
            let empId = parsed.empId;

            if(!finance.includes(empId)){
                this._fuseNavigationService.updateNavigationItem('financialresport', {
                    hidden:true
                })
            }
            else{
                this._fuseNavigationService.updateNavigationItem('financialresport', {
                    hidden:false
                })
            }

            if (!allowed.includes(empId)) {
                this._fuseNavigationService.updateNavigationItem('projects', {
                    hidden: false
                });
                result = true;
            } else if(allowed.includes(empId)) {
                this._fuseNavigationService.updateNavigationItem('projects', {
                    hidden: false
                });
                result = true;
            }

            if(!reports.includes(empId)){
                this._fuseNavigationService.updateNavigationItem('reports', {
                    hidden: true
                });
                result = false;
            }else if(reports.includes(empId)){
                this._fuseNavigationService.updateNavigationItem('reports', {
                    hidden: false
                });
                result = true;
            }    
            
            // if(!employee.includes(empId)){
            //     this._fuseNavigationService.updateNavigationItem('staff-info', {
            //         hidden: true
            //     });
            //     result = false;
            // }else if(employee.includes(empId)){
            //     this._fuseNavigationService.updateNavigationItem('staff-info', {
            //         hidden: false
            //     });
            //     result = true;
            // }        



            if(!financeDataEntry.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('Income');
            }
            
            if(!financeDataEntry.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('expense');
            }

            return result;
        }

    }
}
