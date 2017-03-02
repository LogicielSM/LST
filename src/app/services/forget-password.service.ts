import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

/* Data Model class */
import { DataModel } from '.././models/model';

/* URL Configuration */
import { URLS } from './../config/url.config';

@Injectable()
export class ForgetPasswordService
{
	constructor(private http: Http) { }

    /**
	* Service to send Post request
	* To Add Employees
	*/
	forgetPassword(email: any) {
		var params = {
            email : email
        };
		
		return this.http.post(URLS.FORGOT_PASWORD_URL, params)
		.map((data: Response) => data.json())
		.catch(this.handleError);
	}
	/**
	* Service to send Post request
	* To reset password by user
	*/
	resetPassword(params: any){
		var url = URLS.USER_RESET_PASSWORD_URL;
		return this.http.post(url, params)
		.map((data: Response) => data.json())
		.catch(this.handleError);

	}

	/**
	 * service to send Post request
	 * To reset password by admin
	 */
	adminResetPassword(params: any){
		var url = URLS.ADMIN_RESET_PASSWORD_URL;
		return this.http.post(url, params,this.jwt())
		.map((data: Response) => data.json())
		.catch(this.handleError);
	}
	
	/**
	 * To Change password by User
	 */
	changePassword(params: any){
		var url = URLS.USER_CHANGE_PASSWORD_URL;
		return this.http.post(url, params, this.jwt())
		.map((data: Response) => data.json())
		.catch(this.handleError);

	}

	/**
	* Exception handler function
	*/
	private handleError (error: Response) {
		return Observable.throw(error.json());
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

}
