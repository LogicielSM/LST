import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { NotificationService } from './notification.service';

/* Messages */
import { MESSAGES } from './../config/messages.config';

@Injectable()
export class LocalStorageService
{
	constructor(
        private router: Router,
        private notificationService: NotificationService
    ) {}

	/**
	 * Store User Data
	 */
	user = {
        id   : null,
        name : '',
        role : null,
    }

    /**
     * Auth Token
     */
    authToken:string;

    /**
     * Handle Error
     *
     * @param err [error object]
     */
    handleError(err) {
        this.goToLogin();
    }

    /**
     * Clear all data from local storage
     */
    clearAllData() {
        localStorage.clear();
    }

    /**
     * Set user data in local storage
     *
     * @param data [object] [stores user adta]
     */
    setUser(data) {
    	try {
    		localStorage.setItem('user', JSON.stringify(data));
    	}catch(e) {
 			this.handleError(e);
    	}
    }

    /**
     * Get User data from local storage
     *
     * @return [object] [page id and name]
     */
    getUser() {
    	try{
            /* Check Auth Token */
            this.getAuthToken();
            this.user = JSON.parse(localStorage.getItem('user'));
            if(this.user && this.user.id && this.user.name) {
                return this.user;
            }else {
                this.goToLogin();
            }

        }catch(e) {
            this.handleError(e);
        }
    }

    /**
     * Get User data from local storage Without validate
     *
     * @return [object] [page id and name]
     */
    getUserSimply() {
        try{
            this.user = JSON.parse(localStorage.getItem('user'));

            return this.user;

        }catch(e) {
            this.handleError(e);
        }
    }

    /**
     * Set Auth Token
     *
     * @param token [string] [auth token string]
     */
    setAuthToken(token) {
        try {
            localStorage.setItem('auth_token', token);
        }catch(e) {
             this.handleError(e);
        }
    }

    /**
     * Get auth token from local storage
     *
     * @return [string] [auth token]
     */
    getAuthToken() {
        try{
            this.authToken = localStorage.getItem('auth_token');
            if(!this.authToken) {
                this.goToLogin();
                return;
            }

            return this.authToken;

        }catch(e) {
            this.handleError(e);
        }
    }

    /**
     * Get auth token from local storage
     *
     * @return [string] [auth token]
     */
    getAuthTokenSimply() {
        try{
            return this.authToken = localStorage.getItem('auth_token');
        }catch(e) {
            this.handleError(e);
        }
    }

    /**
     * Get auth token from local storage
     *
     * @return [string] [auth token]
     */
    getAuthTokenWithoutValidate() {
        return localStorage.getItem('auth_token');
    }

    /**
     * Clear Local Storage and go to Login Page
     */
    goToLogin() {
        this.clearAllData();
        this.router.navigateByUrl('login');
        return;
    }
}