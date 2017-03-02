// Angular 2 built in files
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CalendarComponent } from "angular2-fullcalendar/src/calendar/calendar";

/* Page Load Tracker */
import { LoaderComponent } from './modules/loader/loader.component'

/* App Component */
import { AppComponent } from './app.component';

/* Header Component */
import { HeaderComponent } from './modules/header/header.component';

/* App Dashboard Component */
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SubnavComponent } from './modules/subnav/subnav.component';
import { DashboardSidebarComponent } from './modules/dashboard/dashboard-sidebar/dashboard-sidebar.component';

/* Employee Components */
import { EmployeeFormComponent } from './modules/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './modules/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './modules/dashboard/admin/employee-list/employee-list.component';

/* User and Admin components */
import { UserComponent } from './modules/dashboard/user/user.component';
import { AdminComponent } from './modules/dashboard/admin/admin.component';


/* Change and Reset Password Components */
import { ChangePasswordComponent } from './modules/dashboard/user/change-password/change-password.component';
import { ForgetPasswordComponent } from './modules/forget-password/forget-password/forget-password.component';
import { ResetPasswordComponent } from './modules/forget-password/reset-password/reset-password.component';

/* Leave Components */
import { LeaveComponent } from './modules/dashboard/user/leave/leave.component';
import { OnedayLeaveComponent } from './modules/dashboard/user/leave/leave-modules/oneday-leave/oneday-leave.component';
import { TwodayLeaveComponent } from './modules/dashboard/user/leave/leave-modules/twoday-leave/twoday-leave.component';
import { ShortLeaveComponent } from './modules/dashboard/user/leave/leave-modules/short-leave/short-leave.component';
import { LeaveStatusComponent } from './modules/dashboard/leave-status/leave-status.component';
import { LeaveDetailsComponent } from './modules/dashboard/leave-status/leave-details/leave-details.component';

/*  services  */
import { HttpService } from './services/http.service';
import { NotificationService } from './services/notification.service';
import { ForgetPasswordService } from './services/forget-password.service';
import { LocalStorageService } from './services/localStorage.service';

/* Routes */
import { AppRoutingModule, AppRoutingComponents } from './routes/app.routing';
import { AuthoGuardRouting } from './routes/routeGuard/autho.route';

/* Packages */
import { CalenderComponent } from './modules/calender/calender.component';
import { TruncateModule } from 'ng2-truncate';
// import { MaterialModule } from '@angular/material';
// import { MaterializeModule } from 'angular2-materialize';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/* Pipes */
import { OrderByPipe } from './pipes/order-by.pipe';
import { SpiltByPipe } from './pipes/spiltPipe';
import { SearchByPipe } from './pipes/search-by.pipe';
import { CapitalizePipe } from './pipes/capitalize';

/* Directives */
import { EqualValidator } from './directive/equal-validator.directive';

@NgModule({
    declarations: [
        
        /* Pipes */
        SearchByPipe,
        SpiltByPipe,
        CapitalizePipe,
        OrderByPipe,

        /* Directives */
        EqualValidator,

        /* Components */
        AppComponent,
        HeaderComponent,
        EmployeeFormComponent,
        DashboardComponent,
        EmployeeDetailComponent,
        AppRoutingComponents,
        LoginComponent,
        ForgetPasswordComponent,
        ResetPasswordComponent,
        LoaderComponent,
        SubnavComponent,
        LeaveComponent,
        OnedayLeaveComponent,
        TwodayLeaveComponent,
        ShortLeaveComponent,
        CalenderComponent,
        LeaveStatusComponent,
        LeaveDetailsComponent,
        UserComponent,
        AdminComponent,
        DashboardSidebarComponent,
        EmployeeListComponent,
        ChangePasswordComponent,
        CalendarComponent,
    ],
    imports: [
        FlashMessagesModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NgbModule.forRoot(),
        // MaterialModule,
        AppRoutingModule,
        TruncateModule,
        // MaterializeModule,
        ToasterModule,
    ],
    providers: [
        {
            provide  : LocationStrategy,
            useClass : HashLocationStrategy
        },
        AuthoGuardRouting,
        HttpService,
        LocalStorageService,
        NotificationService,
        ForgetPasswordService,
    ],
    bootstrap: [AppComponent]
})

/**
 * App Module
 */
export class AppModule { }
