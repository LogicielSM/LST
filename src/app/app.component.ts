import { Component, OnInit } from '@angular/core';

/* Packages */
import { ToasterConfig } from 'angular2-toaster';

@Component({
	selector: 'lst-root',
	templateUrl: './app.component.html',
})

export class AppComponent {
	
	/**
	 * Toast Message Configs
	 */
	toasterConfigs : ToasterConfig = new ToasterConfig({
	    showCloseButton : false, 
	    tapToDismiss    : true, 
	    timeout			: 3000, /* 1000 = 1 second */
    });
}