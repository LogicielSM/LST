import { Component, OnInit,ElementRef } from '@angular/core';
import { Router, RouterModule,ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'lst-subnav',
	templateUrl: './subnav.component.html',
})
export class SubnavComponent implements OnInit 
{
	constructor(
		private router:Router, 
        private el: ElementRef, 
    ){}

    
	/**
     * page loader tracker
     */ 
    public isRequesting:boolean;
    
    /**
     * check user login or not
     */ 
    public isloggedin:boolean=false;
    
    /**
     * get login user id
     */ 
    public currentUserId;
    
    /**
     * get login user name
     */ 
    public currentUserName;

    /**
     * Initial
     */
	ngOnInit() {
		this.currentUserName = localStorage.getItem('userName');

		this.currentUserId = localStorage.getItem('currentUserId');

		if(localStorage.getItem('currentUser')) {
			this.isloggedin=true;
		}
		
	}

    /**
     * Log Out use
     * Distroy the token from localstorage
     */
	logOut(){
		this.isloggedin=false;

		this.isRequesting = true;

		// this.loginService.logOutUser();

		// this.router.navigate(['']);
		this.isRequesting = false;
	}
}
