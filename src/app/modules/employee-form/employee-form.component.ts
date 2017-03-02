import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/* Model class */
import { DataModel } from '../.././models/model';

/* Configs */
import { URLS } from './../../config/url.config';
import { PATTERNS } from './../../config/forms.config';
import { MESSAGES } from './../../config/messages.config';


/* Services */
import { HttpService } from './../../services/http.service';
import { NotificationService } from './../../services/notification.service';
import { LocalStorageService } from './../../services/localStorage.service';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';


/* Decalring Jquery Variable */
declare var $:any

var chip = {
	tag: 'chip content',
	image: '', //optional
	id: 1, //optional
};

@Component({
	selector: 'lst-employee-form',
	templateUrl: './employee-form.component.html',
})

export class EmployeeFormComponent implements OnInit
{	
	constructor(
		private router:Router,
		private route: ActivatedRoute,
		private httpService: HttpService,
		private notificationService: NotificationService,
		private localStorageService: LocalStorageService,
		public config: NgbDatepickerConfig
	) {
		var date = new Date('1970-01-01');
        
        /* Date Configs */
        config.minDate = {
            year  : date.getFullYear(),
            month : date.getMonth() + 1,
            day   : date.getDate()
        };
        config.outsideDays = 'collapsed';
        config.firstDayOfWeek = 7;
	}

	/**
     * Add / Edit Employee Form Object
     */
    form: FormGroup;

	/**
     * Emplyees Details
     */
	employee = { 
		code       : null,
		firstName  : null,
		lastName   : null,
		email	   : null,
		mobile	   : null,
		address	   : null,
		gender	   : null,
		dob		   : null,
		isActive   : 1,
		role       : null,
		incharges  : [],
		designation : null,
	};
		
	/**
     * Chips Data
     */	
	chips;
	
	/**
     * Store tag value in Array
     */	
	chipsData: any[] = [];
	
	/**
     * Page Laoder
     */	
	isRequesting: boolean;

	/**
	 * Auth User
	 */
	user: any;

	/**
	 * ID of Selected User to Edit
	 */
	selectedUser: number;

	/**
     * Messages
     */
    msg: any = MESSAGES;

    /**
     * Incharges List
     */
    incharges: any[];

    /**
     * Form Edit or Add Label
     */
    formLabel = 'Add Employee';

	/**
     * Initial
     */
	ngOnInit() {

		this.validateForm();

		this.user = this.localStorageService.getUser();

		/* Get id of selected user from routePram */
		this.route.params.subscribe(params => {
			this.selectedUser = params['id'];
		});

		if(this.selectedUser) {
			this.getEmployeeDetails();
		}

		this.getIncharges();
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
     * Validate form data
     */
    validateForm() {
        this.form = new FormGroup({
            email : new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(PATTERNS.email)
            ])),
            mobile : new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(PATTERNS.phone),
                Validators.minLength(10),
            ])),
            code      : new FormControl('', Validators.required),
            firstName : new FormControl('', Validators.required),
            lastName  : new FormControl('', Validators.required),
            gender    : new FormControl('', Validators.required),
            address   : new FormControl('', Validators.required),
            dob		  : new FormControl('', Validators.required),
            role      : new FormControl('', Validators.required),
            isActive  : new FormControl('', null),
            incharges : new FormControl([], null),
            designation : new FormControl('', Validators.required),
   
        });
    }

    /**
     * Get Employee Deatils For Edit
     */
	getEmployeeDetails() {

		this.formLabel = 'Edit Employee';

		this.isRequesting = true;

		var url = URLS.GET_EMPLOYEE_BY_ID_URL + '/' + this.selectedUser;

		this.httpService.get(url)
		.then(
			(res) => {
				this.fillEmployeeDetails(res.data.employee);
				this.isRequesting = false
			},
			(err) => this.handleError(err)
		);
	}

	/**	
	 * Fill Employee Details in Form
	 */
	fillEmployeeDetails(data) {
		this.employee = { 
			code       : data.emp_code,
			firstName  : data.first_name,
			lastName   : data.last_name,
			email	   : data.email,
			mobile	   : data.mobile,
			address	   : data.address,
			gender	   : data.gender,
			dob		   : data.dob,
			isActive   : data.is_active,
			role       : data.group_id,
			incharges  : data.incharges,
			designation : data.designation,
		};
	}

	/**
	 * Go To Dashboard
	 */
	goToDasbord() {
        switch(this.user.role) {
            case 0:
            case '0':
                this.router.navigate(['/app-dashboard/user-dashboard']);
                break;

            case 1:
            case '1':
                this.router.navigate(['/app-dashboard/admin-dashboard']);
                break;
        }
	}

	/**
	 * Add / update Employee
	 */
	addUpdateEmployee() {
		/* Format Params */
		var params = {
			emp_code    : this.employee.code,
			first_name  : this.employee.firstName,
			last_name   : this.employee.lastName,
			email 	    : this.employee.email,
			mobile 	    : this.employee.mobile,
			address     : this.employee.address,
			gender      : this.employee.gender,
			dob 	    : this.setDateFormat(this.employee.dob),
			is_active   : this.employee.isActive,
			group_id    : this.employee.role,
			incharges   : [1],
			designation : this.employee.designation,
		};

		if(!params.is_active) {
			params.is_active = 0;
		}
		/* Format URL */
		var url = URLS.ADD_EMPLOYEE_URL;

		/* To update */
		if(this.selectedUser) {
			url = url + '/' + this.selectedUser;
		}

		/* Send Request */
		this.httpService.post(url, params)
		.then(
			(res) => {
				this.isRequesting = false;
				this.notificationService.success(MESSAGES.EMPLOYEE_ADDED);
				this.router.navigate(['app-dashboard/employee-list']);
			},
			(err) => this.handleError(err)
		);
	}

	/**
	 * Get Incharges
	 */
	getIncharges()  {
		this.httpService.get(URLS.GET_EMPLOYEES_URL)
		.then(
			(res) => {
				this.incharges = res.data;
			},
			(err) => this.handleError(err),
		)
	}

	/**
     * Set Date Format
     *
     * @param date [date Object]
     */
    setDateFormat(date) {
       return date.year + '-' + this.setZero(date.month) + '-' + this.setZero(date.day);
    }

    /**
     * ADd zero before single digut
     */
    setZero(n) {
        if(n > 9) return n;

        return '0' + n;
    }

	/********************************/
        /* Date Picker Settings */
    /********************************/
    /**
     * Check Weelend
     */
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }
}
