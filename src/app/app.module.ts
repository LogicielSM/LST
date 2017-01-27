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
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchByPipe } from './pipes/search-by.pipe'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeFormComponent,
    DashboardComponent,
    EmployeeDetailComponent,
    AppRoutingComponents,
    OrderByPipe,
    SearchByPipe
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
export class AppModule { }
