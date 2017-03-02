import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";

/* model */ 
import { Leave } from '../../../../../.././models/leave';

/* Services */
import { HttpService } from '../../../../../.././services/http.service';
import { NotificationService } from '../../../../../../services/notification.service';
import { NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

/* pacages */ 
import * as moment from 'moment/moment';

/* Configs */
import { URLS } from './../../../../../../config/url.config';
import { MESSAGES } from './../../../../../../config/messages.config';
import { PATTERNS, LEAVE_PRIORITIES } from './../../../../../../config/forms.config';

/* declare $ for jquery use */ 
declare var $:any;

@Component({
    selector: 'lst-twoday-leave',
    templateUrl: './twoday-leave.component.html',
})

export class TwodayLeaveComponent implements OnInit
{
    constructor(
        private router:Router,
        private route: ActivatedRoute,
        private httpService: HttpService,
        private notificationService: NotificationService,
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
        dateFrom  : null,
        dateTo    : null,
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
     * page loader tracker
     */ 
    public isRequesting: boolean;
    
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
            dateFrom : new FormControl(null, Validators.required),
            dateTo   : new FormControl(null, Validators.required),
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
     * Apply multi days leave
     */
    applyLeave() {
        this.isRequesting = true;

        /* Format Params */
        var params = {
            date_from: this.setDateFormat(this.leaveData.dateFrom),
            date_to  : this.setDateFormat(this.leaveData.dateTo),
            subject  : this.leaveData.subject,
            note     : this.leaveData.reason,
            priority : this.leaveData.priority,
            type     : 'Multi Days',
            leave_count : this.getDateDifference()
        }

        params.date_from = this.setDateFormat(this.leaveData.dateFrom);
        params.date_to = this.setDateFormat(this.leaveData.dateTo);

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
     * Get Date Differnce in days
     */
    getDateDifference() {
        var a = new Date(this.leaveData.dateTo);
        var b = new Date(this.leaveData.dateFrom);

        var timeDiff = Math.abs(a.getTime() - b.getTime());
        
        return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; 
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
    }
}
