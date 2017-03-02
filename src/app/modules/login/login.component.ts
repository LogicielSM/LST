import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/* Data model class */
import { Login } from '../../models/login';

/* Configs */
import { URLS } from './../../config/url.config';
import { PATTERNS } from './../../config/forms.config';
import { MESSAGES } from './../../config/messages.config';


/* Services */
import { NotificationService } from '../../services/notification.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'lst-login',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit
{
    constructor( 
        private router: Router,
        private notificationService: NotificationService,
        private localStorageService: LocalStorageService,
        private httpService: HttpService,
    ) {}

    /**
     * Login Form Object
     */
    loginForm: FormGroup;
    
    /**
     * Login Info
     */ 
    private loginData = {
        email    : '',
        password : ''
    }

    /**
     * Page loader
     */ 
    isRequesting: boolean;

    /**
     * Auth User
     */
    user: any;

    /**
     * Messages
     */
    msg: any;
    
    /**
     * Initial
     */
    ngOnInit() {
        /* Get User */
        this.user = this.localStorageService.getUser();
        this.validateForm();
        this.msg = MESSAGES;

        if(!this.user) return;

        /* Verify User */
        this.checkUserType();
    }

    /**
     * Validate form data
     */
    validateForm() {
        this.loginForm = new FormGroup({
            email : new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(PATTERNS.email)
            ])),
            password : new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
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
        this.notificationService.error(err.error.validationError.message);
    }

    /**
     * Login user
     */
    login() {
        this.isRequesting = true;

        /* Format Params */
        var params = {
            email    : this.loginData.email,
            password : this.loginData.password,
        };

        /* Send Request */
        this.httpService.post(URLS.LOGIN_URL, params)
        .then(
            (res) => this.loginSuccess(res),
            (err) => this.handleError(err),
        );
    }

    /**
     * Handle Login Success Response
     *
     * @param res [api success response object] 
     */
    loginSuccess(res) {
        /* User Local Info */
        this.user = {
            id   : res.data.id,
            name : res.data.name,
            role : res.data.group_id,
        }

        /* Set Local Storage Data */
        this.localStorageService.setAuthToken(res.data.token);
        this.localStorageService.setUser(this.user);

        this.isRequesting = false;

        /* Go to Dashboard */
        this.checkUserType();

        /* Success Notification */
        this.notificationService.success(MESSAGES.LOGIN_SUCCESS);
    }

    /**
     * Redirect User according to role
     */
    checkUserType() {
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
