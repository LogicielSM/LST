import { Component,ElementRef,Inject, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';

/* Pipes */
import { SearchByPipe } from '../../../pipes/search-by.pipe';
import { OrderByPipe } from '../../../pipes/order-by.pipe';

/* Configs */
import { URLS } from './../../../config/url.config';
import { MESSAGES } from './../../../config/messages.config';

/* Services */
import { HttpService } from '../../.././services/http.service';
import { NotificationService } from '../../.././services/notification.service';
import { LocalStorageService } from './../../../services/localStorage.service';

/* declare $ for jquery use */ 
declare var $:any;

@Component({
  selector: 'lst-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit
{
 	constructor(
        private notificationService: NotificationService,
        private httpService: HttpService,
        private route: ActivatedRoute,
        private router:Router,
        private localStorageService: LocalStorageService,
    ) {}

	/**
     * store upcoming leave detail
     */ 
    leaves: any[];

    /**
     * Store upcoming leaves
     */ 
    upcomingLeaves: any[];
    
    /**
     * Store previouse leaves
     */ 
    previousLeaves: any[];
    
    /**
     * Page loader 
     */ 
    isRequesting: boolean;

    /**
     * Auth User
     */ 
    user: any;

    /**
     * Leave Types
     */
    leaveTypes = {
        up  : 'Upcoming',
        pre : 'Previous',
    }

    /**
     * Selected Leave Type
     *
     * @param ['Upcoming', 'Previous']
     */ 
    leaveType = this.leaveTypes.up;

    /**
     * Initial
     */
	ngOnInit() {  
        this.user = this.localStorageService.getUser();
		this.getUpcomingLeaves();
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
     * Get Upcoming Leaves of all Users
     */
    getUpcomingLeaves() {
        this.isRequesting = true;

        this.httpService.get(URLS.ADMIN_UPCOMING_LEAVES_URL)
        .then(
            (res) => {
                this.upcomingLeaves = res.data;
                this.getPreviousLeaves();
            },
            (err) => this.handleError(err),
        );
    }

    /**
     * Get Previous leave of all Users
     */
    getPreviousLeaves() {
        this.isRequesting = true;

        this.httpService.get(URLS.ADMIN_PREVIOUS_LEAVES_URL)
        .then(
            (res) => {
                this.previousLeaves = res.data;
                this.showUpcomingLeaves();
                this.isRequesting = false;
            },
            (err) => this.handleError(err),
        );
    }

    showUpcomingLeaves() {
        this.leaveType = this.leaveTypes.up;
        this.leaves = this.upcomingLeaves;
    }

    showPreviousLeaves() {
        this.leaveType = this.leaveTypes.pre;
        this.leaves = this.previousLeaves;
    }
    
    /**
     * Go To Leave Details Screen
     *
     * @param leaveId [selected leave id]
     */
    goToLeaveDetails(leaveId){
        this.router.navigate(['/app-dashboard/leave-details',leaveId])
    }

}
