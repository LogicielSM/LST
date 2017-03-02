import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LocalStorageService } from './../../services/localStorage.service';

@Injectable()
export class AuthoGuardRouting implements CanActivate
{
    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
    ) {}
    
    /**
     * Verify Authentication
     */
    canActivate() {
        var user = this.localStorageService.getUser();

        if(user) {
            return true;
        } else {
            this.router.navigateByUrl('login');
            return false;
        }
    }
}
