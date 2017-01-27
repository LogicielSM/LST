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
var EmployeeDetailComponent = (function () {
    function EmployeeDetailComponent(httpService, route, _router) {
        this.httpService = httpService;
        this.route = route;
        this._router = _router;
        this.editing = false;
    }
    EmployeeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
        });
        if (this.id > -1) {
            var objectData;
            this.route.params
                .switchMap(function (params) { return _this.httpService.getEmp(params['id']); })
                .subscribe(function (emp) {
                objectData = emp;
                _this.employeeData = objectData.data;
            });
        }
    };
    return EmployeeDetailComponent;
}());
EmployeeDetailComponent = __decorate([
    Component({
        selector: 'lst-employee-detail',
        templateUrl: './employee-detail.component.html',
        styleUrls: ['./employee-detail.component.css']
    }),
    __metadata("design:paramtypes", [HttpService,
        ActivatedRoute,
        Router])
], EmployeeDetailComponent);
export { EmployeeDetailComponent };
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/modules/employee-detail/employee-detail.component.js.map