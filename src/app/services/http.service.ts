import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { Router } from '@angular/router';
/* Data Model class */
import { DataModel } from '.././models/model';

/* Configs */
import { URLS } from './../config/url.config';
import { MESSAGES } from './../config/messages.config';

/* Services */
import { NotificationService } from './notification.service';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class HttpService {

	private url = URLS.ADD_EMPLOYEE_URL;
	
	private data;
	public getId = 0;

	constructor(
		private http: Http,
		private notificationService: NotificationService,
		private router: Router,
        private localStorage: LocalStorageService,
	) { 
		this.data = [];
	}

	/**
	 * service to send get request
	 * To Get Employees
	 */
	getEmployees() {
		return this.http.get(this.url, this.jwt())
		.map((response: Response) => response.json())
		.catch(this.handleError);
	}

	/**
	 * service to send Post request
	 * To Add Employees
	 */
	addEmployee(user: any){
		return this.http.post(this.url, user, this.jwt())
		.map((data: Response) => data.json())
		.catch(this.handleError);
	}

	/**
	 * service to send Put request
	 * To Update Employees
	 */
	updateEmployee ( employee: DataModel) {
		return this.http.post(`${this.url}/${employee.id}`, employee, this.jwt()) // ...using put request
		.map((response:Response) => response.json()) 
		.catch(this.handleError);
	}

	/**
	 * service to send get request
	 * To Get Employees By id
	 */
	getEmp(id: number){
		const url = `${this.url}/${id}`;
		return this.http.get(url, this.jwt())
		.map(response => response.json().data as DataModel)
		.catch(this.handleError);
	}

	/**
	 * service to send delete request
	 * To Delete Employees By id
	 */
	deleteEmployee(id:number){
		return this.http.delete(`${this.url}/${id}`, this.jwt())
		.map((response:Response) => response.json())
		.catch(this.handleError);
	}
	
	/**
	 * jwt function to get toke 
	 * set toke to Authorization
	 */
	private jwt() {
		let currentUser = localStorage.getItem('currentUser');
		if (currentUser && currentUser) {
			let headers = new Headers({ 'Authorization': 'bearer ' + currentUser });
			return new RequestOptions({ headers: headers });
		}
	}

	// /**
	//  * Exception handler function
	//  */
	// private handleError (error: Response) {
	// 	return Observable.throw(error.json());
	// }


	/***************************************************************
	||
	||
	||               NEW HTTP CLASS SERVICE
	||
	||
	***************************************************************/

	/**
     * POST Request
     *
     * @param [url] [string]
     * @param [params] [object] [Data that pass to url]
     */
    post(url: string, params): Promise<any> {

        var headers = new Headers({
            'Content-Type'  : 'application/json',
            'Authorization' : 'bearer ' + this.localStorage.getAuthTokenSimply(),
            'Access-Control-Allow-Origin':'*',
        });

        var options = new RequestOptions({ headers: headers });

        /* send request*/
        return this.http.post(url, JSON.stringify(params), options)
        .toPromise()
        .then(
            res => this.handleResponse(res),
            error => this.handleError(error)
        );
    }

    /**
     * GET Request
     *
     * @param [url] [string]
     */
    get(url: string): Promise<any> {

        var headers = new Headers({
            'Content-Type'  : 'application/json',
            'Authorization' : 'bearer ' + this.localStorage.getAuthTokenSimply(),
        });
        
        var options = new RequestOptions({ headers: headers });
        
        /* send request*/
        return this.http.get(url, options)
    	.toPromise()
    	.then(
    		res => this.handleResponse(res),
    		error => this.handleError(error)
    	);            
    }

    /**
     * DELET Request
     *
     * @param [url] [string]
     */
    delete(url: string): Promise<any> {

        var headers = new Headers({
            'Content-Type'  : 'application/json',
            'Authorization' : 'bearer ' + this.localStorage.getAuthTokenSimply(),
        });
        
        var options = new RequestOptions({ headers: headers });
        
        /* send request*/
        return this.http.delete(url, options)
        .toPromise()
        .then(
            res => this.handleResponse(res),
            error => this.handleError(error)
        );            
    }

    /**
     * Handle Success Response
     *
     * @param response [API Error Response]
     */
    handleResponse(response: Response) {
        var res = response.json();
        
        return res;
    }

    /**
     * Handle Error Response
     *
     * @param error [Api Error]
     */
    handleError(error: Response) {
        var err = error.json();

        /* Handle Specific Errors */
        if(err.error) {
            switch(err.error) {
                case 'token_not_provided':
                case 'user_not_found':
                case 'token_invalid':
                case 'token_expired':

                    this.notificationService.error(MESSAGES.SESSION_EXPIRED);
                    return this.goToLogin(err.error);
            }
        }

        if(err.error && err.error.message) {
            /* Handle Token Blacklisted Error */
            if(err.error.message == "The token has been blacklisted") {
                return this.goToLogin(err.error);
            }

            this.notificationService.error(err.error.message);
        }

        if(err.error && err.error.validationError
            && err.error.validationError.message
            && err.error.validationError.message.email
            && err.error.validationError.message.email[0])
        {
            
            this.notificationService.error(err.error.validationError.message.email[0]);
        }
        
        return Promise.reject(err);
    }

    /**
     * Go To Login if Some Basic Conditions are failed.
     *
     * @param error [API Error Response]
     */
    goToLogin(error) {
        this.localStorage.clearAllData();
        this.router.navigateByUrl('login');

        return Promise.reject(error);
    }



}
