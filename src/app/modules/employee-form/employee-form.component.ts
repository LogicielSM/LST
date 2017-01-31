import { Component, OnInit } from '@angular/core';
import { HttpService } from '../.././services/http.service';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { DataModel } from '../.././models/model';
declare var $:any

var chip = {
		tag: 'chip content',
		image: '', //optional
		id: 1, //optional
	};
@Component({
  selector: 'lst-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
	private employeeData = new DataModel (1,'420','','','',8,'','male','','',false);
	public editing = false;
	public isactive= false;
	public sub;
	public id;
	public buttonText='Save';
	items: any[] = [];
	public emp;
	public selectedId:number;
	employees: any[] = [];
	public tagValue;
	public myArray : any[] = [];
	constructor(
		private _router:Router,
		private route: ActivatedRoute,
		private httpService: HttpService) 
	{}

	ngOnInit() {
		this.getEmployees();

		$('.chips-autocomplete').material_chip({
			placeholder: 'Enter a tag',
			secondaryPlaceholder: '+Tag',
			autocompleteData: {
				'Apple': null,
				'Microsoft': null,
				'Google': null
			}
		});


		 // $('.datepicker').pickadate({
		 //    selectMonths: true, // Creates a dropdown to control month
		 //    selectYears: 70 // Creates a dropdown of 15 years to control year
 		//  });
 		//  var $input = $('.datepicker').pickadate();
 		//  var picker = $input.pickadate('picker');
 		//  console.log(picker);
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
	      		this.employeeData = objectData;
	      		this.isactive = true;
	      	})
		}
	}

	showTagValues(){
     this.tagValue = $('.chips-autocomplete').material_chip('data');
		for (let key in this.tagValue) {
			this.myArray.push(this.tagValue[key].tag);			
		}
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
				console.log(this.employees[0].email);
			});
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
			// this.employeeData.incharges = this.myArray;
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
