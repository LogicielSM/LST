import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeFormComponent } from './../modules/employee-form/employee-form.component';
import { DashboardComponent } from './../modules/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './../modules/employee-detail/employee-detail.component';


const routes : Routes = [
	{
		path: '',
		pathMatch : 'full',
		redirectTo: 'app-dashboard'
	},
	{
		path: 'app-dashboard',
		component: DashboardComponent
	},
	{
		path: 'employee-form',
		component: EmployeeFormComponent
	},
	{
		path: 'employee-form/:id',
		component: EmployeeFormComponent
	},
	{
		path: 'employee-Detail/:id',
		component: EmployeeDetailComponent
	},
	// {
	// 	path: 'employee-Detail',
	// 	component: EmployeeDetailComponent
	// },
];



@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRoutingComponents = [EmployeeFormComponent, DashboardComponent, EmployeeDetailComponent];