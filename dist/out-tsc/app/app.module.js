var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { EmployeeFormComponent } from './modules/employee-form/employee-form.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './modules/employee-detail/employee-detail.component';
import { AppRoutingModule, AppRoutingComponents } from './routes/app.routing';
// import { DataModel } from './models/model';
import { HttpService } from './services/http.service';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HeaderComponent,
            EmployeeFormComponent,
            DashboardComponent,
            EmployeeDetailComponent,
            AppRoutingComponents
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            AppRoutingModule
        ],
        providers: [HttpService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/app.module.js.map