import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './../../../services/localStorage.service';

@Component({
	selector: 'lst-dashboard-sidebar',
	templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent implements OnInit
{
	constructor(private localStorageService: LocalStorageService) {}

	/**
	 * TURE id user is admin
	 */ 
	isAdmin:boolean = false;
	
	/**
	 * User details
	 */
	user: any;

	/**
	 * Initial
	 */
    ngOnInit() {
		this.user = this.localStorageService.getUser();

		if(this.user && this.user.role && this.user.role == 1) {
			this.isAdmin = true;
		}
    }
}
