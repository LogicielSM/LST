import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/* Data model class */
import { Login } from '../../../models/login';

/* Configs */
import { URLS } from '../../../config/url.config';
import { PATTERNS } from '../../../config/forms.config';
import { MESSAGES } from '../../../config/messages.config';

/* Services */
import { NotificationService } from '../../../services/notification.service';
import { ForgetPasswordService } from '../../../services/forget-password.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'lst-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../.././login/login.component.css']
})

export class ResetPasswordComponent implements OnInit
{
    constructor( 
        private router:Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService,
        private forgetPasswordService: ForgetPasswordService,
        private httpService: HttpService,
        private localStorageService: LocalStorageService
    ) {}

    /**
     * Change Password Form Object
     */
    resetPasswordForm: FormGroup;


    /**
     * Messages
     */
    msg: any = MESSAGES;

    /**
     * Change Password Info
     */ 
    private data = {
        newPassword     : '',
        confirmPassword : ''
    }

    /**
     * TRUE if New Password and Confirm Password are same 
     */
    isSamePasswords = false;

    /**
     * store login model
     */
	private resetPassword = new Login ('','','','');

    /**
     * page loader tracker
     */    
	public isRequesting: boolean;

    /**
     * store token from routeparams
     */
	public token;

    /**
     * Initial
     */
	ngOnInit() {
        this.validateForm();
        /**
         * get token from route param
         */
		this.route.params.subscribe(params => {
			this.token = params['token']; 
		});
	}

    validateForm() {
        this.resetPasswordForm = new FormGroup({
            newPassword : new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])),
            confirmPassword : new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });

        /* Subscribe */
        this.resetPasswordForm.valueChanges.subscribe((value) => {
            if(this.resetPasswordForm.valid && this.data.newPassword == this.data.confirmPassword) {
                this.isSamePasswords = true;
            }else {
                this.isSamePasswords = false;
            }
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
     * Reset password
     */
	savePassword(){
        this.isRequesting = true;

        /* Format Params */
        var params = {
            token                 : this.token,
            password              : this.data.newPassword,
            password_confirmation : this.data.confirmPassword,
        };

        /* Send Request */
        this.httpService.post(URLS.USER_RESET_PASSWORD_URL, params)
        .then(
            (res) => {
                this.localStorageService.goToLogin();
                this.notificationService.success(MESSAGES.LOGIN_WITH_NEW_PWD);
            },
            (err) => this.handleError(err),
        );
    }
}
