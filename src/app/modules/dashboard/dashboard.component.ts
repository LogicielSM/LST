import { Component, OnInit } from '@angular/core';

/* JQuery Object */
declare var $:any;

@Component({
	selector: 'lst-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit
{	
    /**
     * Initial
     */
	ngOnInit() {
		/* JQuery Menu toggle */ 
		$("#menu-toggle").click((e) => {
	        e.preventDefault();
	        $("#wrapper").toggleClass("toggled");
    	});
	}
}
