import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';

/* Services */
import { NotificationService } from '../../.././services/notification.service';
import { LocalStorageService } from '../../.././services/localStorage.service';
import { HttpService } from '../../.././services/http.service';

/* Configs */
import { URLS } from './../../../config/url.config';
/* Pipes */
import { OrderByPipe } from '../../.././pipes/order-by.pipe';
import { SpiltByPipe } from '../../.././pipes/spiltPipe';


@Component({
	selector: 'lst-leave-status',
	templateUrl: './leave-status.component.html',
	styleUrls: ['./leave-status.component.css']
})

export class LeaveStatusComponent implements OnInit
{
	constructor(
		private router:Router,
		private notificationService:NotificationService,
		private localStorageService:LocalStorageService,
		private httpService:HttpService,
	) { }


    /**
     * List of all Leaves
     */
	public leaves: any[]= [];

	/**
     * TRUE if user is Admin
     */
	public isAdmin:boolean = false;

	/**
     * Sort Types
     */
	public sortTypes = [ 'created_at', 'priority'];

	/**
     * Sort Types
     */
	public sortBy = this.sortTypes[0];	

	/**
     * Page Loader
     */ 
	public isRequesting:boolean;

	/**
	 * Auth User
	 */
	user: any;

	/**
     * Characters limit of Reason
     */
    textLimit = 20;


	/**
     * Initial
     */
	ngOnInit() {

		this.user = this.localStorageService.getUser();

		/* Check User Role */
		if(this.user && this.user.role && this.user.role == 1) {
			this.isAdmin = true;
			this.getLeavesForAdmin();
		} else {
			this.getLeavesForUser();
		}
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
	 * Get leaves of all employees for admin
	 */
	getLeavesForAdmin() {
		this.isRequesting = true;

		this.httpService.get(URLS.ALL_LEAVES_URL)
		.then(
			(res) => {
				this.leaves = res.data;
				this.isRequesting = false;
			},
			(err) => this.handleError(err)
		);
	}

	/**
	 * Get All Upcoming User Leaves  
	 */
	getLeavesForUser(){
		this.isRequesting = true;

		this.httpService.get(URLS.USER_UPCOMING_LEAVES_URL)
		.then(
			(res) => {
				this.leaves = res.data;
				this.isRequesting = false;
			},
			(err) => this.handleError(err)
		);
	}

	/**
	 * Go To Leave Details Screen
	 *
	 * @param leaveId [id of selecvted leave]
	 */
	goToLeaveDetails(leaveId) {
		this.router.navigate(['/app-dashboard/leave-details', leaveId])
	}
}
