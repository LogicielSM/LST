/**
 * Change Password Component for User
 */
export class ChangePassword
{
	constructor(
		public current_password 	 :string, /* Stores current password */
		public new_password			 :string, /* Stores new password */
		public password_confirmation :string, /* Stores confirmation password */
	) {}
}
