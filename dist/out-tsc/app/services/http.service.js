var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.url = 'http://lst.dev.clientreviews.info/api/v1/employees';
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.getId = 0;
        this.data = [];
    }
    HttpService.prototype.ngOnInit = function () {
    };
    HttpService.prototype.getEmployees = function () {
        return this.http.get(this.url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HttpService.prototype.addEmployee = function (user) {
        var body = JSON.stringify(user);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url, body, {
            headers: headers
        })
            .map(function (data) { return data.json(); })
            .catch(this.handleError);
    };
    HttpService.prototype.updateEmployee = function (employee) {
        var headers;
        return this.http.put(this.url + "/" + employee.id, employee, { headers: this.headers }) // ...using put request
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HttpService.prototype.getEmp = function (id) {
        var url = this.url + "/" + id;
        return this.http.get(url)
            .map(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    HttpService.prototype.deleteEmployee = function (id) {
        return this.http.delete(this.url + "/" + id)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HttpService.prototype.handleError = function (error) {
        console.log(error);
        return Observable.throw(error.json());
    };
    return HttpService;
}());
HttpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], HttpService);
export { HttpService };
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/services/http.service.js.map