import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Route Guard */
import { AuthoGuardRouting } from './routeGuard/autho.route';

import { UserComponent } from './../modules/dashboard/user/user.component';
import { AdminComponent } from './../modules/dashboard/admin/admin.component';
import { DashboardComponent } from './../modules/dashboard/dashboard.component';

/* Employee Components */
import { EmployeeFormComponent } from './../modules/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './../modules/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './../modules/dashboard/admin/employee-list/employee-list.component';

/* Login and Password Components */
import { LoginComponent } from './../modules/login/login.component';
import { ForgetPasswordComponent } from './../modules/forget-password/forget-password/forget-password.component';
import { ResetPasswordComponent } from './../modules/forget-password/reset-password/reset-password.component';
import { ChangePasswordComponent } from './../modules/dashboard/user/change-password/change-password.component';

/* Leave Components */
import { LeaveComponent } from './../modules/dashboard/user/leave/leave.component';
import { LeaveStatusComponent } from './../modules/dashboard/leave-status/leave-status.component';
import { LeaveDetailsComponent } from './../modules/dashboard/leave-status/leave-details/leave-details.component';
import { OnedayLeaveComponent } from './../modules/dashboard/user/leave/leave-modules/oneday-leave/oneday-leave.component';
import { ShortLeaveComponent } from './../modules/dashboard/user/leave/leave-modules/short-leave/short-leave.component';
import { TwodayLeaveComponent } from './../modules/dashboard/user/leave/leave-modules/twoday-leave/twoday-leave.component';


/* Calender Component */
import { CalenderComponent } from './../modules/calender/calender.component'

/**
 * All Routes
 */
const routes : Routes = [
	{
		path: '',
		pathMatch : 'full',
		redirectTo: 'login'
	},
	{
		path: 'app-dashboard',
		component: DashboardComponent,
		children: [
			{
				path: 'user-dashboard',
				component: UserComponent
			},
			{
				path: 'admin-dashboard',
				component: AdminComponent 
			},
			{
				path: 'employee-list',
				component: EmployeeListComponent
			},
			{
				path: 'leave-status/:id',
				component: LeaveStatusComponent
			},
			{
				path: 'leave-details',
				component: LeaveDetailsComponent
			},
			{
				path: 'calender',
				component: CalenderComponent
			},
			{
				path: 'leave',
				component: LeaveComponent
			},
			{
				path: 'oneDay-leave',
				component: OnedayLeaveComponent
			},
			{
				path: 'short-leave',
				component: ShortLeaveComponent
			},
			{
				path: 'multiDays-leave',
				component: TwodayLeaveComponent
			},
			{
				path: 'employee-Detail/:id',
				component: EmployeeDetailComponent
			},
			{
				path: 'leave-details/:leaveId',
				component: LeaveDetailsComponent
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
				path: 'leave-status',
				component: LeaveStatusComponent
			},
			{
				path: 'change-password',
				component: ChangePasswordComponent
			}
		]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'forget-password',
		component: ForgetPasswordComponent
	},
	{
		path: 'password/reset/:token',
		component: ResetPasswordComponent
	},
	{
		path: 'calender',
		component: CalenderComponent
	},
	{
		path: '**',
		redirectTo: 'login'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }

/**
 * List of Routing Components
 */
export const AppRoutingComponents = [
	EmployeeFormComponent,
	DashboardComponent,
	EmployeeDetailComponent,
	ForgetPasswordComponent,
	ResetPasswordComponent,
	CalenderComponent,
	LeaveStatusComponent,
	LeaveDetailsComponent,
	EmployeeListComponent,
	ChangePasswordComponent,
	OnedayLeaveComponent,
	ShortLeaveComponent,
	TwodayLeaveComponent
];
