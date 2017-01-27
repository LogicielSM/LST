import { Component, OnInit } from '@angular/core';
import { HttpService } from '../.././services/http.service';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DataModel } from '../.././models/model';


@Component({
	selector: 'lst-employee-detail',
	templateUrl: './employee-detail.component.html',
	styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
	private employeeData = new DataModel (1,'420','','','',9,'','Male','',false);
	public editing = false;
	public sub;
	public id;
	constructor(
		private httpService: HttpService,
		private route: ActivatedRoute,
		private _router:Router
		){ }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; 

		});
		if( this.id > -1 ) {
			var objectData;
			this.route.params
			.switchMap((params: Params) => this.httpService.getEmp(params['id']))
			.subscribe(emp => {
				objectData= emp;
				this.employeeData = objectData.data;
				console.log(this.employeeData);
			})
		}
	}

	editEmployee(){
		this._router.navigate(['/employee-form', this.employeeData.id]);
	}


	navigateToDasbord(){
		this._router.navigateByUrl('/app-dashboard');
	}


	deleteEmployee() {
		this.httpService.deleteEmployee(this.employeeData.id)
		.subscribe(
			data => {
				alert(data.data.message);
				this.navigateToDasbord();
			},
			error => console.log(error)
			);
	}


}
