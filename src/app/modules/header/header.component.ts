import { Component, OnInit,ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import  'rxjs/add/operator/filter';

/* Services */
import { HttpService } from './../../services/http.service';
import { LocalStorageService } from './../../services/localStorage.service';
import { NotificationService } from './../../services/notification.service';

/* Configs */
import { URLS } from './../../config/url.config';
import { MESSAGES } from './../../config/messages.config';

/* JQuery Object */
declare var $: any

@Component({
    selector: 'lst-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit
{
	constructor(
        private router: Router,
		private httpService: HttpService,
        private localStorageService: LocalStorageService,
		private notificationService: NotificationService,

	) {}

    /**
     * Page loader
     */ 
    isRequesting: boolean;

    /**
     * TRUE if User Login
     */ 
    showHeader: boolean;

    /**
     * TRUE if User is Admin
     */ 
    isAdmin: boolean;

    /**
     * Auth User
     */ 
    user: any;

    /**
     * Initial
     */
    ngOnInit() {
        this.getUser();
        this.subscribeRoute();
    }

    /**
     * Handle Error
     *
     * @param response [API Error Response]
     */
    handleError(err) {
        this.isRequesting = false;
    }

    /**
     * Logout 
     */
    logout() {
        this.showHeader = false;
    	this.localStorageService.goToLogin();
        this.notificationService.success(MESSAGES.LOGOUT_SUCCESS);
    }

    /**
     * Subscribe Route Events to handle active classes and header visibility
     */
    subscribeRoute() {
        this.router.events
        .filter(event => event instanceof NavigationStart)
        .subscribe((event:NavigationStart) => {
            this.getUser();
            switch (event.url) {
                case "/login":
                case "/forget-password":
                    this.showHeader = false;
                    this.user = null;
                    break;

                default:
                    this.showHeader = true;

            }
            
        });
    }

    /**
     * Get Auth User
     */
    getUser() {
        this.user = this.localStorageService.getUserSimply();

        if(this.user) {
            this.showHeader = true;
            if(this.user.role == 1) {
                this.isAdmin = true;
            }else{
                this.isAdmin = false;
            }
        }
    }

    /**
     * Go To User Profile
     */
    goToProfile() {
        this.router.navigate(['/app-dashboard/employee-Detail', this.user.id]);
    }

    /**
     * Go To Leaves
     */
    goToLeaves() {
        this.router.navigate(['/app-dashboard/leave-status']);
    }

    /**
     * Go To Apply Leave
     * 
     * @param type [leave type]
     */
    goToApplyLeave(type) {
        switch (type) {
            case "one_day":
                this.router.navigate(['/app-dashboard/oneDay-leave']);
                break;
            
            case "multi_day":
                this.router.navigate(['/app-dashboard/multiDays-leave']);
                break;

            case "short":
                this.router.navigate(['/app-dashboard/short-leave']);
                break;
        }
    }

    /**
     * Go To Calender
     */
    goToCalender() {
        this.router.navigate(['/calender']);
    }
}
