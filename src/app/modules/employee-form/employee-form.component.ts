import { Component, OnInit } from '@angular/core';
import { HttpService } from '../.././services/http.service';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DataModel } from '../.././models/model';

@Component({
  selector: 'lst-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
	private employeeData = new DataModel (1,'420','','','',9,'','Male','',false);
	public editing = false;
	public sub;
	public id;
	public buttonText='Save';
	items: any[] = [];
	public emp;
	public selectedId:number;
	constructor(
		private _router:Router,
		private route: ActivatedRoute,
		private httpService: HttpService) 
	{}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 

    	});
		if( this.id > -1 ) {
			this.buttonText='Update';
			var objectData;
			this.route.params
	      	.switchMap((params: Params) => this.httpService.getEmp(params['id']))
	      	.subscribe(emp => {
	      		objectData= emp;
	      		this.employeeData = objectData.data;
	      	})
		}
	}
	 
	navigateToDasbord(){
		this._router.navigateByUrl('/app-dashboard');
	}

	addEmployee() {

		if( this.id > -1 ) {
		
			this.httpService.updateEmployee(this.employeeData)
			.subscribe(() =>
				this.navigateToDasbord()
				);
		}else{
			JSON.stringify(this.employeeData);
			this.httpService.addEmployee(this.employeeData)
			.subscribe(
				employeeData => {
					employeeData => console.log(employeeData);
					this.navigateToDasbord();
				}, 
				error => console.log(error)
				);
		}
	}
	


}
