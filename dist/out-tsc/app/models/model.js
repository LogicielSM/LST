var DataModel = (function () {
    function DataModel(id, emp_code, first_name, last_name, email, mobile, address, gender, dob, is_active) {
        this.id = id;
        this.emp_code = emp_code;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.gender = gender;
        this.dob = dob;
        this.is_active = is_active;
    }
    return DataModel;
}());
export { DataModel };
//# sourceMappingURL=/Users/harwinder/Documents/LST/src/app/models/model.js.map