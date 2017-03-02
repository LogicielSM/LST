import { Component,ElementRef,Inject, OnInit } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';

/* services */
import { HttpService } from '../.././services/http.service';
import { NotificationService } from '../.././services/notification.service';

/* Packages */
import * as moment from 'moment/moment';

/* Configs */
import { URLS } from './../../config/url.config';

/* Declare variable */
declare var $:any;

@Component({
    selector: 'lst-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.css']
})

export class CalenderComponent implements OnInit
{
    constructor(
        private notificationService: NotificationService,
        private httpService: HttpService,
    ) {}

    /**
     * Calender Configs
     */
    calendarOptions: Object;

    /**
     * Store Calender Event
     */
    events: any;

    /**
     * Page Loader
     */
    isRequesting: boolean;

    /**
     * show calender after get events 
     */
    showCalender: boolean = false;

    /**
     * Selected Leave Details
     */
    leave = {
        title : '',
        start : '',
        end   : '',
    };

    /**
     * Initial
     */
    ngOnInit(){
        $('.modal').modal();
        this.getEvents();
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
     * Get Events from Leave Details
     */
    getEvents() {
        this.isRequesting = true;
        this.showCalender = false;

        /* Format URL */
        var url = URLS.ALL_LEAVES_URL;

        /* Send Request */
        this.httpService.get(url)
        .then(
            (res) => {
                var events = []
                for(let key in res.data) {
                    events.push({
                        title : res.data[key].subject,
                        start : res.data[key].date_to
                    });
                }
                this.events = events;
                this.getCelanderConfigs();
                this.isRequesting = false
            },
            (err) => this.handleError(err)
        )
    }

    /** 
     * Get Calender View and Config
     */
    getCelanderConfigs() {
        /* Calender Configs */
        this.calendarOptions = {
            height  : 750,
            width   :100,
            fixedWeekCount : false,
            defaultDate: new Date(),
            header:{
                left   : 'month agendaWeek agendaDay',
                center : 'title',
                right  : 'today prev,next'
            },
            buttonIcons: {
                prev : 'left-single-arrow',
                next : 'right-single-arrow',
                prevYear : 'left-double-arrow',    
                nextYear : 'right-double-arrow'
            },
            eventLimit   : true, 
            eventSources :  [{
                events : this.events
            }],
            eventClick: function(calEvent) {
                this.leave = {
                    title : calEvent.title,
                    start : calEvent.start._i,
                    end   : '',
                };

                console.log(this.leave);
                
                this.showModal=true;
                    $(".modal").modal("open");
            }
        };
        this.showCalender = true;
    }

    testing(){
        console.log(this.events);
    }

    /** 
     * Close Popup Modal
     */
    closeModal(){
        $(".modal").modal("close");
    }
}