import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/* Configs */
import { URLS } from './../../../config/url.config';
import { PATTERNS } from './../../../config/forms.config';
import { MESSAGES } from './../../../config/messages.config';

/* Services */
import { HttpService } from './../../../services/http.service';
import { NotificationService } from '../../../services/notification.service';
import { ForgetPasswordService } from '../../.././services/forget-password.service';

@Component({
	selector: 'lst-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['../.././login/login.component.css']
})

export class ForgetPasswordComponent implements OnInit
{
	constructor(
		private router:Router,
		private httpService: HttpService,
		private notificationService:NotificationService,
		private forgetPasswordService:ForgetPasswordService
	) { }

	/**
     * page loader tracker
     */	
	public isRequesting: boolean;

	/**
     * email ngModel
     */
	public email;

	/**
     * Messages
     */
    msg: any = MESSAGES;

    /**
     * Form Form Object
     */
    forgetPasswordForm: FormGroup;

    /**
     * Initial
     */
    ngOnInit() {
    	this.validateForm();
    }
    
    /**
     * Validate form data
     */
    validateForm() {
        this.forgetPasswordForm = new FormGroup({
            email : new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(PATTERNS.email)
            ])),
        });
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
	 * Get Email to Reset password
	 */
	reset(email) {
		
		var params = {
            email : email
        };
		this.isRequesting = true;

		/* Send Request */
        this.httpService.post(URLS.FORGOT_PASWORD_URL, params)
        .then(
            (res) => {
                this.notificationService.success(MESSAGES.CHECK_EMAIL);
                this.isRequesting = false;
            },
            (err) => this.handleError(err)
        );
	}
	
	/**
     * Go TO User DAshboard Screen
     */
    goToDashboard() {
        this.router.navigate(['app-dashboard/user-dashboard']);
    }
}
