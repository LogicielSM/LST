import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';

/* Model */
import { Comments } from '../../../.././models/comment';

/* Configs */
import { URLS } from './../../../../config/url.config';


/* Services */
import { NotificationService } from '../../../.././services/notification.service';
import { LocalStorageService } from '../../../.././services/localStorage.service';
import { HttpService } from '../../../.././services/http.service';

/* Pipes */
import { CapitalizePipe } from '../../../.././pipes/capitalize';

@Component({
	selector: 'lst-leave-details',
	templateUrl: './leave-details.component.html',
	styleUrls: ['./leave-details.component.css']
})

export class LeaveDetailsComponent implements OnInit
{
	constructor(
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService,
        private localStorageService: LocalStorageService,
        private httpService: HttpService,
	) { }
	
    /**
     * Selected Leave Details
     */
    leave: any[];

    /**
     * Emp - Incharge Chat
     */
    chat: any[];

    /**
     * User
     */
    user: any;

    /**
     * current User
     */
    currentUser: any;

    /**
     * Types of Leave Status
     */
    leaveStatusTypes = ['Approved', 'Not Approved'];

    /**
     * Write Message
     */
    message: string;

    /**
     *
     */
    leaveId: number;

	/**
     * Pager Load
     */ 
    public isRequesting:boolean;

	/**
     * Initial
     */
    ngOnInit() {
        this.currentUser = this.localStorageService.getUser();
    	this.route.params.subscribe( (params) => {
            this.leaveId = params['leaveId'];
        });

     	this.getChat();
    }

    /**
     * Handle Error
     *
     * @param response [API Error Response]
     */
    handleError(err) {
        this.isRequesting = false;
    }

    /**
     * Get Emp - Inchanrge Chat Messages
     */
    getChat() {
        this.isRequesting = true;

        var url = URLS.LEAVE_COMMENT_URL + '/' + this.leaveId;
        this.httpService.get(url)
        .then(
            (res) => {
                this.leave = res.data;
                this.user = res.data.user[0];
                this.chat = res.data.notes;
                this.isRequesting = false;
           },
           (err) => this.handleError(err),
        ); 
    }

    /**
     * Send Message
     */
    sendMessage() {
        this.isRequesting = true;

        var params = {
            ref_id : this.leaveId,
            notes    : this.message,
        }
        this.httpService.post(URLS.NOTES_URL, params)
        .then(
            (res) => {
                this.message = '';
                this.getChat();
            },
            (err) => this.handleError(err),
        );
    }

	/**
     * Update Leave Status By Admin
     */ 
    updateLeaveStatus() {}
 }