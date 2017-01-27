/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { EmployeeDetailComponent } from './employee-detail.component';
describe('EmployeeDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EmployeeDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EmployeeDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/modules/employee-detail/employee-detail.component.spec.js.map