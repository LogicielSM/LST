/**
 * Login Component
 * Stores Login Information
 */
export class Login {
	constructor(
		public password_confirmation :string, /* Stores confirmation password */
		public email 	:string, /* Stores email */
		public password :string, /* Stores password */
		public token, /* Stores token */
	){}
}
