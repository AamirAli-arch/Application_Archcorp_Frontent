import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MAT_SINGLE_DATE_SELECTION_MODEL_FACTORY } from '@angular/material/datepicker';
import * as signalR from '@microsoft/signalr';
import { environment } from 'environments/environment';
import { NotificationService } from 'app/main/pages/notification/services/notification.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "(window:click)": "onClick()"
    }
})

export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];

    //signalR connection
    private connection: signalR.HubConnection;

    userEmail: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    isMenuOpen = false;
    trayData = [];
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private router: Router,
        public dialog: MatDialog,
        private _notificationService: NotificationService
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Information)
            .withUrl(environment.apiUrl + '/NotificationHub', { withCredentials: true })
            .build();

            this._notificationService.getNotificationTrayList().subscribe((response: any) => {
                this.trayData = response.notifications;
            });
        this.tokenParse();
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });

        this._notificationService.getnotificationcount.subscribe((response:any)=>{
            this._notificationService.getNotificationTrayList().subscribe((response: any) => {
                this.trayData = response.notifications;
            });
        })
    }


    ngAfterViewInit() {
     // Load notification list   
    this.notificationList()
    }

    notificationList(){
        this.connection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));

    this.connection.on('notification', () => {
        this._notificationService.getNotificationTrayList().subscribe((response: any) => {
            this.trayData = response.notifications;
        })

    });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
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
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout() {
        localStorage.removeItem("token");
        this.router.navigate(["login"]);
    }

    tokenParse() {
        const token = localStorage.getItem("token");
        const parsed = JSON.parse(atob(token.split('.')[1]));
        this.userEmail = parsed.email;
    }

    updatePassword() {
        const dialogRef = this.dialog.open(ChangePasswordComponent);

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    notification() {
        this.router.navigate(["pages/notification"]);
    }

    redirectUrl(id: number, type:number) {
        if (type === 1 || type === 6) {
            this.router.navigate(["pages/leave-summary"]);
            this._notificationService.updateCount(id);
        } else if(type===2 || type === 5){
            this.router.navigate(["pages/time-leaves"]);
            this._notificationService.updateCount(id);
        } else if(type===3 || type ===7){
            this.router.navigate(["pages/myleave-request"]);
            this._notificationService.updateCount(id);
        } else if(type===4){
            this.router.navigate(["pages/timeoff-leaves"]);
            this._notificationService.updateCount(id);
        } else{
            //this.router.navigate(["pages/notification"]);
        } 
        
    }

    toggleMenu($event) {
        $event.stopPropagation();
        this.isMenuOpen = !this.isMenuOpen;
    }

    onClick() {
        this.isMenuOpen = false;
    }
}
