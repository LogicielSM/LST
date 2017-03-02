import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';

/* JQuery Object */
declare var $:any

@Component({
    selector: 'lst-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

    constructor(
        private router:Router,
        private notificationService:NotificationService,
    ) {}
    
    /**
     * Initial
     */
    ngOnInit() {
    	/* Initialize Tabs */
    	$('ul.tabs').tabs();
    }
}
