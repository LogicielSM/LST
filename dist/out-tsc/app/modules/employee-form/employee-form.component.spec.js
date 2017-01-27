/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
describe('EmployeeFormComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EmployeeFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EmployeeFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/modules/employee-form/employee-form.component.spec.js.map