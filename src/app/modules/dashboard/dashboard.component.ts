import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';

import { HttpService } from '../.././services/http.service';
import { SearchByPipe } from '../../pipes/search-by.pipe';
import { OrderByPipe } from '../../pipes/order-by.pipe';

@Component({
	selector: 'lst-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	employees: any[] = [];
	public employeeObj;
	public sorts = ['first_name','dob'];
	public emp;
	constructor(private httpService: HttpService,private route: ActivatedRoute, private _router:Router ) { }

	data :any[];
	ngOnInit() {
		this.emp={
			sort: this.sorts[0],
		}
		this.getEmployees();

	}

	/*
	* Navigating to Form Page 
	*/

	navigateToForm(){
		this._router.navigateByUrl('/employee-form');
	}

	getEmployees(){
		this.httpService.getEmployees()
		.subscribe(
			data => {
				const myArray = [];
				for (let key in data) {
					myArray.push(data[key]);
				}
				this.employees = myArray[0];
			});
	}

	deleteEmployee(employee: any) {
		this.employeeObj = employee;
	}

	modalConfirmation(){
		this.httpService.deleteEmployee(this.employeeObj.id)
		.subscribe(
			data => {
				alert(data.data.message);
				this.getEmployees();
			},
			error => console.log(error)
			);
	}

	// employeeDetail(){
	// 	this._router.navigate(['/employee-Detail']);
	// }

	editEmployee(employee: any){
		this._router.navigate(['/employee-form', employee.id]);
	}

	viewEmployee(employee: any){
		this._router.navigate(['/employee-Detail', employee.id]);
	}


}
