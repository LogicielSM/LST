import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

/* Model */
import { DataModel } from '../.././models/model';

/* Services */
import { HttpService } from '../.././services/http.service';
import { NotificationService } from '../../services/notification.service';
import { ForgetPasswordService } from '../../services/forget-password.service';
import { LocalStorageService } from '../../services/localStorage.service';

/* Configs */
import { URLS } from './../../config/url.config';

@Component({
	selector: 'lst-employee-detail',
	templateUrl: './employee-detail.component.html',
	styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit
{
	constructor(
		private httpService: HttpService,
		private forgetPasswordservice: ForgetPasswordService,
		private route: ActivatedRoute,
		private router:Router,
		private notificationService: NotificationService,
		private localStorageService: LocalStorageService,
	) {}

	/**
     * store employee model
     */
	private profile = new DataModel(null, null, '', '', '', null, '', 'male', '', '', false, null, [], '');
	
	/**
     * Selected Empolyee
     */
	selectedEmpId;
	
	/**
     * Page Loader
     */
	isRequesting: boolean;
	
	/**
     * TRUE if user is admin
     */
	isAdmin: boolean= false;

	/**
	 * User Details
	 */
	user: any;

	/**
     * Initial
     */
	ngOnInit() {

		this.user = this.localStorageService.getUser();
		
		if(this.user && this.user.role && this.user.role == 1) {
            this.isAdmin = true; 
        }

		/**
		 * Get Selected Employee ID from URL
		 */
		this.route.params.subscribe(params => {
			this.selectedEmpId = params['id'];
		});

		if( this.selectedEmpId > 0 ) {
			this.getEmployeeData();
		}
	}

	/**
	 * Get Single User Details
	 */
	getEmployeeData() {
		this.isRequesting = true;

		/* Format URL */
		var url = URLS.GET_EMPLOYEE_BY_ID_URL + '/' + this.selectedEmpId;

		/* Send Request */
		this.httpService.get(url)
		.then(
			(res) => {
				this.profile = res.data.employee;
				this.isRequesting = false;
			},
			(err) => this.handleError(err)
		)
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
	 * Navigating from View to Form page with employee id 
	 * To Edit Employee Detail
	 */
	editEmployee(){
		this.router.navigate(['/app-dashboard/employee-form', this.profile.id]);
	}

	/**
	 * Navigating from View to Dashboard
	 */
	navigateToDasbord(){
		if(this.user.role == 1) {
			if(this.user.id==this.selectedEmpId) {
				
				this.router.navigateByUrl('/app-dashboard/admin-dashboard');
			}else {
				this.router.navigateByUrl('/app-dashboard/employee-list');
				return;
			}
		}

		this.router.navigateByUrl('/app-dashboard/user-dashboard');
	}

	/**
	 * Deleting Employe on View page
	 */
	deleteEmployee() {
		this.isRequesting = true;

		this.httpService.deleteEmployee(this.profile.id)
		.subscribe(
			data => {
				this.notificationService.success('User is Deleted successfuly');
				this.navigateToDasbord();
				this.isRequesting = false;
			},
			error => {
				this.notificationService.error(error);
				this.isRequesting = false;
			}
		);
	}
	/**
	 * reset password through admin
	 */
	resetPassword() {
		this.isRequesting = true;

		let params={
			email:this.profile.email
		}

		this.forgetPasswordservice.adminResetPassword(params)
		.subscribe(
			data => {
				
				this.notificationService.success('password Reset Successfuly');
				this.isRequesting = false;
			},
			error => {
				this.notificationService.error(error);
				this.isRequesting = false;
			}
		);
	}

	convertBoolToString(){
		if(this.profile.is_active == true) {
			// this.isActive = "Yes";
		}else {
			// this.isActive = "No";
		}
	}

}
