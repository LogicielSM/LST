import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/* model */ 
import { Leave } from '../../../../../.././models/leave';

/* Services */
import { HttpService } from '../../../../../.././services/http.service';
import { NotificationService } from '../../../../../../services/notification.service';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

/* Configs */
import { URLS } from './../../../../../../config/url.config';
import { MESSAGES } from './../../../../../../config/messages.config';
import { PATTERNS, LEAVE_PRIORITIES } from './../../../../../../config/forms.config';

@Component({
	selector: 'lst-oneday-leave',
	templateUrl: './oneday-leave.component.html',
})

export class OnedayLeaveComponent implements OnInit
{
    constructor(
        private router:Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService,
        private httpService: HttpService,
        public config: NgbDatepickerConfig
    ) {
        var date = new Date();
        
        /* Date Configs */
        config.minDate = {
            year  : date.getFullYear(),
            month : date.getMonth() + 1,
            day   : date.getDate()
        };
        config.outsideDays = 'collapsed';
        config.firstDayOfWeek = 7;
    }

    /**
     * Leave Foem
     */
    leaveForm: FormGroup;

    /**
     * Leave Details
     */ 
    leaveData = {
        date      : '',
        subject   : '',
        reason    : '',
        priority  : '',
    }

    /**
     * Messages
     */
    msg: any = MESSAGES;

    /**
     * Leave Priorities
     */
    priorities: any = LEAVE_PRIORITIES;

    /**
     * Page loader
     */ 
    isRequesting: boolean;
    
    /**
     * Initial
     */
    ngOnInit() {
        this.validateForm();
    }

    /**
     * Validate form data
     */
    validateForm() {
        this.leaveForm = new FormGroup({
            date     : new FormControl('', Validators.required),
            reason   : new FormControl('', Validators.required),
            subject  : new FormControl('', Validators.required),
            priority : new FormControl('', null),
        });
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
  	 * Apply One Day Leave
  	 */
  	applyLeave() {
        this.isRequesting = true;

        /* Format Params */
        var params = {
            date_to  : this.setDateFormat(this.leaveData.date),
            date_from: this.setDateFormat(this.leaveData.date),
            subject  : this.leaveData.subject,
            note     : this.leaveData.reason,
            priority : this.leaveData.priority,
            type     : 'One Day',
            leave_count : 1
        }

        params.date_to = this.setDateFormat(this.leaveData.date);
        params.date_from = this.setDateFormat(this.leaveData.date);

        if(!params.priority) {
            params.priority = this.priorities.low;
        }

        /* Send Request */
        this.httpService.post(URLS.LEAVES_URL, params)
        .then(
            (res) => {
                this.goToDashboard();
                this.notificationService.success(MESSAGES.LEAVE_APPLIED);
            },
            (err) => this.handleError(err)
        );
    }

    /**
     * Go TO User DAshboard Screen
     */
    goToDashboard() {
        this.router.navigate(['app-dashboard/user-dashboard']);
    }

    /**
     * Set Date Format
     *
     * @param date [date Object]
     */
    setDateFormat(date) {
       return date.year + '-' + this.setZero(date.month) + '-' + this.setZero(date.day);
    }

    /**
     * ADd zero before single digut
     */
    setZero(n) {
        if(n > 9) return n;

        return '0' + n;
    }

    /********************************/
        /* Date Picker Settings */
    /********************************/
    /**
     * Check Weelend
     */
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }
}
