import { Component,ElementRef,Inject, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';

/* Filter Pipes */
import { SearchByPipe } from '../../../../pipes/search-by.pipe';
import { OrderByPipe } from '../../../../pipes/order-by.pipe';

/* Configs */
import { URLS } from '../../../../config/url.config';

/* Services */
import { HttpService } from '../../../.././services/http.service';
import { LocalStorageService } from '../../../.././services/localStorage.service';
import { NotificationService } from '../../../.././services/notification.service';

/* declare $ for jquery use */
declare var $:any;

@Component({
  selector: 'lst-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit
{
 	constructor(
        private notificationService: NotificationService,
        private httpService: HttpService,
        private localStorageService: LocalStorageService,
        private route: ActivatedRoute,
        private router:Router
    ) {}

	/**
     * List of all Employees
     */ 
	employees: any[] = [];

	/**
     * Array to do sorting
     */ 
	sortTypes = ['first_name', 'dob'];
	
	/**
     * Sort By
     */ 
	sortBy = this.sortTypes[0];
    
    /**
     * Page loader
     */ 
    isRequesting: boolean;

    /**
     * Auth User
     */
    user: any;

    /**
     * Search Input Box ngModal
     */
    search: any;

    /**
     * Get Employee Id
     */
    empId: any;

    /**
     * Initial
     */
	ngOnInit() {  
		this.user = this.localStorageService.getUser();
		$('.modal').modal();

		this.getEmployees();
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
	 * Navigating from Dashbord to form with employee id 
	 * To Edit Employe Detail
	 */
	navigateToForm() {
		this.router.navigateByUrl('/app-dashboard/employee-form');
	}
	
	/**
	 * To Get All Employees on Dashboard
	 */
	getEmployees() {
		this.isRequesting = true;

		this.httpService.get(URLS.GET_EMPLOYEES_URL)
		.then(
			(res) => {
				this.employees = res.data;
				this.isRequesting = false;
			},
			(err) => this.handleError(err),
		);
	}

	/**
	 * To Delete a Employee and call modal
	 */
	deleteEmployee(employeeID) {
		this.empId = employeeID;
	}

	/**
	 * Confirm to Delete employee
	 */
	modalConfirmation(){
		this.isRequesting = true;
		var url = URLS.GET_EMPLOYEE_BY_ID_URL + '/' + this.empId 
		this.httpService.delete(url)
		.then(
			(res) => {
				console.log(res);
				this.getEmployees();
			},
			(err) => this.handleError(err)
		);
	}

	/**
	 * Go to 'Edit Employee' Screen
	 *
	 * @param employeeID [ID of selected employee]
	 */
	editEmployee(employeeID) {
		this.router.navigate(['/app-dashboard/employee-form', employeeID]);
	}

	/**
	 * Go to 'Employee Details' Screen 
	 *
	 * @param employeeID [ID of selected employee]
	 */
	viewEmployee(employeeID) {
		this.router.navigate(['/app-dashboard/employee-Detail', employeeID]);
	}
}
