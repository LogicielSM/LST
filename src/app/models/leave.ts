/**
 * Leave Component
 * Stores leave Information
 */
export class Leave {
	constructor(
		public type		   : string, /* Stores type of leave */
		public date_from   : string, /* Stores Starting date of leave */
		public date_to	   : string, /* Stores leave ending date */
		public subject	   : string, /* Stores subject of leave */
		public note		   : string, /* Stores reason of leave */
		public priority	   : string, /* Stores priority of leave */
		public total_count : number, /* Stores total count of leave */
	) {}
}
