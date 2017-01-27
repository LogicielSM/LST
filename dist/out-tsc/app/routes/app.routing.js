var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './../modules/employee-form/employee-form.component';
import { DashboardComponent } from './../modules/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './../modules/employee-detail/employee-detail.component';
var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app-dashboard'
    },
    {
        path: 'app-dashboard',
        component: DashboardComponent
    },
    {
        path: 'add-employee',
        component: EmployeeFormComponent
    },
    {
        path: 'add-employee/:id',
        component: EmployeeFormComponent
    },
    {
        path: 'employee-Detail/:id',
        component: EmployeeDetailComponent
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
export var AppRoutingComponents = [EmployeeFormComponent, DashboardComponent, EmployeeDetailComponent];
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/routes/app.routing.js.map