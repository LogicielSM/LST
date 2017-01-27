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
import { HttpService } from '../.././services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataModel } from '../.././models/model';
var EmployeeFormComponent = (function () {
    function EmployeeFormComponent(_router, route, httpService) {
        this._router = _router;
        this.route = route;
        this.httpService = httpService;
        this.employeeData = new DataModel(1, '420', '', '', '', '', '', 'Male', '', false);
        this.editing = false;
        this.buttonText = 'Save';
        this.items = [];
    }
    EmployeeFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
        });
        if (this.id > -1) {
            this.buttonText = 'Update';
            var objectData;
            this.route.params
                .switchMap(function (params) { return _this.httpService.getEmp(params['id']); })
                .subscribe(function (emp) {
                objectData = emp;
                _this.employeeData = objectData.data;
            });
        }
    };
    EmployeeFormComponent.prototype.navigateToDasbord = function () {
        this._router.navigateByUrl('/app-dashboard');
    };
    EmployeeFormComponent.prototype.addEmployee = function () {
        var _this = this;
        if (this.id > -1) {
            this.httpService.updateEmployee(this.employeeData)
                .subscribe(function () {
                return _this.navigateToDasbord();
            });
        }
        else {
            JSON.stringify(this.employeeData);
            this.httpService.addEmployee(this.employeeData)
                .subscribe(function (employeeData) {
                (function (employeeData) { return console.log(employeeData); });
                _this.navigateToDasbord();
            }, function (error) { return console.log(error); });
        }
    };
    return EmployeeFormComponent;
}());
EmployeeFormComponent = __decorate([
    Component({
        selector: 'lst-employee-form',
        templateUrl: './employee-form.component.html',
        styleUrls: ['./employee-form.component.css']
    }),
    __metadata("design:paramtypes", [Router,
        ActivatedRoute,
        HttpService])
], EmployeeFormComponent);
export { EmployeeFormComponent };
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/modules/employee-form/employee-form.component.js.map