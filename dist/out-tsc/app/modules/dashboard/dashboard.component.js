var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../.././services/http.service';
var DashboardComponent = (function () {
    function DashboardComponent(httpService, route, _router) {
        this.httpService = httpService;
        this.route = route;
        this._router = _router;
        this.employees = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getEmployees();
    };
    /*
    * Navigating to Form Page
    */
    DashboardComponent.prototype.navigateToForm = function () {
        this._router.navigateByUrl('/add-employee');
    };
    DashboardComponent.prototype.getEmployees = function () {
        var _this = this;
        this.httpService.getEmployees()
            .subscribe(function (data) {
            var myArray = [];
            for (var key in data) {
                myArray.push(data[key]);
            }
            _this.employees = myArray[0];
        });
    };
    DashboardComponent.prototype.deleteEmployee = function (employee) {
        this.employeeObj = employee;
    };
    DashboardComponent.prototype.modalConfirmation = function () {
        var _this = this;
        this.httpService.deleteEmployee(this.employeeObj.id)
            .subscribe(function (data) {
            alert(data.data.message);
            _this.getEmployees();
        }, function (error) { return console.log(error); });
    };
    DashboardComponent.prototype.employeeDetail = function () {
        this._router.navigate(['/employee-Detail']);
    };
    DashboardComponent.prototype.editEmployee = function (employee) {
        this._router.navigate(['/add-employee', employee.id]);
    };
    DashboardComponent.prototype.viewEmployee = function (employee) {
        this._router.navigate(['/employee-Detail', employee.id]);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Component({
        selector: 'lst-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [HttpService, ActivatedRoute, Router])
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/modules/dashboard/dashboard.component.js.map