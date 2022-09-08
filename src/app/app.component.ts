import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform, private router: Router
    )
    {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd ) {
                    if(event.url==='/'){
                       this.router.navigate(["pages/projects"]);
                    }
            }
          });
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         */

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         * setTimeout(() => {
         * this._translateService.setDefaultLang('en');
         * this._translateService.setDefaultLang('tr');
         * });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getCurrentUserId();
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if ( this.fuseConfig.layout.width === 'boxed' )
                {
                    this.document.body.classList.add('boxed');
                }
                else
                {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for ( let i = 0; i < this.document.body.classList.length; i++ )
                {
                    const className = this.document.body.classList[i];

                    if ( className.startsWith('theme-') )
                    {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });

      

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    getCurrentUserId() : void
    {
        const token = localStorage.getItem("token");
        if(token != null){
            const parsed = JSON.parse(atob(token.split('.')[1]));
            let allowed : string[] = ['1', '85','18','22','35', '14', '31','20','23','2','49','19','17','27','3', '8', '45', '47', '52'];
            let leaves : string[] = ['1','18','85','22','20','35', '45', '47', '52','64','6','17','27','31','61','64'];
            let reports : string[] = ['1','18','85','22','35', '45', '47', '52','64','20','28'];
            let siteProjection : string[] = ['1','18','85','22','35','64','20','31'];
            let adminDashboard : string[] = ['18','85','28','20','22','1','45'];
            let finance : string[] = ['20','22','45','18','85'];
            let financeDataEntry : string[] = ['45','20'];
            //let staffId : string[] =['45'];  
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
            } else {
                this._fuseNavigationService.updateNavigationItem('projects', {
                    hidden: false
                });
            }

            if(!reports.includes(empId)){
                this._fuseNavigationService.updateNavigationItem('reports', {
                    hidden: true
                });
            }else{
                this._fuseNavigationService.updateNavigationItem('reports', {
                    hidden: false
                });
            }

            if(!leaves.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('leave-summary')
                this._fuseNavigationService.removeNavigationItem('view-balance-details')
            }
            if(!leaves.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('Time-leave')
            }

            if(!siteProjection.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('siteResource');
            }

            
            // if(!staffId.includes(empId)){
            //     this._fuseNavigationService.removeNavigationItem('view-staff');
            // }

            if(!adminDashboard.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('dashboard');
            }

            if(!financeDataEntry.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('Income');
            }
            
            if(!financeDataEntry.includes(empId)){
                this._fuseNavigationService.removeNavigationItem('expense');
            }
        }
        
    }

}
