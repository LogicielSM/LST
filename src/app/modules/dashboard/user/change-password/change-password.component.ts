import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

/* model */
import { ChangePassword } from '../../../../models/change-password';

/* Configs */
import { URLS } from './../../../../config/url.config';
import { PATTERNS } from './../../../../config/forms.config';
import { MESSAGES } from './../../../../config/messages.config';

/* Services */
import { NotificationService } from '../../../../services/notification.service';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { HttpService } from '../../../../services/http.service';

@Component({
    selector: 'lst-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['../../.././login/login.component.css']
})

export class ChangePasswordComponent implements OnInit
{
    constructor(
        private router : Router,
        private notificationService:NotificationService,
        private localStorageService:LocalStorageService,
        private httpService:HttpService,
    ) { }

    /**
     * Change Password Form Object
     */
    form: FormGroup;

    /**
     * Change Password Info
     */ 
    private data = {
        currentPassword : '',
        newPassword     : '',
        confirmPassword : ''
    }

    /**
     * TRUE if New Password and Confirm Password are same 
     */
    isSamePasswords = false;

    /**
     * Page Loader 
     */ 
    isRequesting: boolean;

    /**
     * Messages
     */
    msg: any = MESSAGES;

    /**
     * Auth User
     */
    user: any;

    /**
     * Initial
     */
    ngOnInit() {
        this.validateForm();
        this.user = this.localStorageService.getUserSimply();
    }

    /**
     * Validate form data
     */
    validateForm() {
        this.form = new FormGroup({
            currentPassword : new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])),
            newPassword : new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])),
            confirmPassword : new FormControl('', Validators.compose([
                Validators.required,
            ])),
        });

        /* Subscribe */
        this.form.valueChanges.subscribe((value) => {
            if(this.form.valid && this.data.newPassword == this.data.confirmPassword) {
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
     * change password
     */
    changePassword(){
        this.isRequesting = true;

        /* Format Params */
        var params = {
            current_password      : this.data.currentPassword,
            new_password          : this.data.newPassword,
            password_confirmation : this.data.confirmPassword,
        };

        /* Send Request */
        this.httpService.post(URLS.USER_CHANGE_PASSWORD_URL, params)
        .then(
            (res) => {
                this.localStorageService.goToLogin();
                this.notificationService.success(MESSAGES.PASSWORD_CHANGED);
            },
            (err) => this.handleError(err),
        );
    }

    /**
     * Redirect User according to role
     */
    goToDasgboard() {
        switch (this.user.role) {
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
}

