import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { DataModel } from '.././models/model';


@Injectable()
export class HttpService {

	private url = 'http://lst.dev.clientreviews.info/api/v1/employees';
	private headers = new Headers({'Content-Type': 'application/json'});
	private data;
	public getId = 0;
	constructor(private http: Http) { 
		this.data = [];
	}

	ngOnInit() {

	}

	getEmployees() {
		return this.http.get(this.url)
		.map((response: Response) => response.json())
		.catch(this.handleError);

	}

	addEmployee(user: any) {
		const body = JSON.stringify(user);
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(this.url, body, {
			headers: headers
		})
		.map((data: Response) => data.json())
		.catch(this.handleError);
	}

	updateEmployee ( employee: DataModel) {
		var headers;
		return this.http.put(`${this.url}/${employee.id}`, employee, {headers: this.headers}) // ...using put request
		.map((response:Response) => response.json()) 
		.catch(this.handleError);
	}

	getEmp(id: number){
		const url = `${this.url}/${id}`;
		return this.http.get(url)
		.map(response => response.json().data as DataModel)
		.catch(this.handleError);
	}


	deleteEmployee(id:number){

		return this.http.delete(`${this.url}/${id}`)
		.map((response:Response) => response.json())
		.catch(this.handleError);

	}

	private handleError (error: any) {
		console.log(error);
		return Observable.throw(error.json());
	}


}
