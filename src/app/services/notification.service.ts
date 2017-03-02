import { Injectable } from '@angular/core';

/* Packages */
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class NotificationService
{
    constructor(private _toastMessages: ToasterService) {}

    /**
     * Show success toast message
     *
     * @param message [string] [message to shoe]
     */
    success(msg) {
        this._toastMessages.pop('success', msg, '');   
    }

    /**
     * Show error toast message
     *
     * @param message [string] [message to shoe]
     */
    error(msg) {
        this._toastMessages.pop('error', msg, '');   
    }

    /**
     * Show warning toast message
     *
     * @param message [string] [message to shoe]
     */
    warning(msg) {
        this._toastMessages.pop('warning', msg, '');   
    }

    /**
     * Show info toast message
     *
     * @param message [string] [message to shoe]
     */
    info(msg) {
        this._toastMessages.pop('info', msg, '');   
    }
}