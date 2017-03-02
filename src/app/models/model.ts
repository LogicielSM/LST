/**
 * User Data Component
 * Stores User Information
 */
export class DataModel
{
	constructor(
		public id 		   : number, /* Stores Id */
		public emp_code    : string, /* Stores Employee Code */
		public first_name  : string, /* Stores First Name */
		public last_name   : string, /* Stores Last Name */
		public email	   : string, /* Stores Email */
		public mobile	   : number, /* Stores Mobile Number */
		public address	   : string, /* Stores Address */
		public gender	   : string, /* Stores Gender */
		public dob		   : string, /* Stores Date of Birth */
		public designation : string, /* Stores Designation */
		public is_active   : boolean, /* Chacks if User is active or not */
		public group_id	   : number, /* Checks for user or admin */
		public incharges   : Array<any>, /* Stores Employee's incharges */
		public image	   : any /* Stores Profule Image */
	) {}
}
