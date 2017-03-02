/**
 * Import API URl
 */
import { API_URL } from '../.././environments/environment';

/*****************/
	/* URLS */
/*****************/
export const URLS = {
	/**
	 * Login Url
	 */
	LOGIN_URL : API_URL + 'login',

	/**
	 * Logout Url
	 */
	LOGOUT_URL : API_URL + 'logout',

	/**
	 * For Get All emplyoees list Url
	 */
	GET_EMPLOYEES_URL : API_URL + 'employees',

	/**
	 * For Addding emplyoees Url
	 */
	ADD_EMPLOYEE_URL : API_URL + 'employees',

	/**
	 * Get emplyoees By id Url
	 * Use for edit, View and delete a single employee
	 */
	GET_EMPLOYEE_BY_ID_URL : API_URL + 'employees',

	/**
	 * Leave Url
	 * All leaves are stored in it
	 */
	LEAVES_URL : API_URL + 'leaves',

	/**
	 * Upcoming Leaves Url
	 * For User
	 */
	USER_UPCOMING_LEAVES_URL : API_URL + 'leaves/coming-leave',

	/**
	 * Previous Leaves Url
	 * For User
	 */
	USER_PREVIOUS_LEAVES_URL : API_URL + 'leaves/history',

	/**
	 * Upcoming Leaves Url
	 * For Admin
	 */
	ADMIN_UPCOMING_LEAVES_URL : API_URL + 'admin/admin-upLeave',

	/**
	 * Upcoming Leaves Url
	 * For Admin
	 */
	ADMIN_PREVIOUS_LEAVES_URL : API_URL + 'admin/admin-historyLeave',

	/**
	 * Forgot Password Url
	 * For User
	 */
	FORGOT_PASWORD_URL : API_URL + 'forgot-password',

	/**
	 * Reset Password Url
	 * For User
	 */
	USER_RESET_PASSWORD_URL : API_URL + 'reset-password',

	/**
	 * Reset Password Url
	 * For User
	 */
	USER_CHANGE_PASSWORD_URL : API_URL + 'changePwd',

	/**
	 * Reset Password Url
	 * For Admin
	 */
	ADMIN_RESET_PASSWORD_URL : API_URL + 'changePwd',

	/**
	 * Leave Status Url
	 * For Admin
	 */
	LEAVE_STATUS_URL : API_URL + 'admin/approve',

	/**
	 * Get All Leaves Url
	 * For Admin
	 */
	ALL_LEAVES_URL : API_URL + 'leaves',

	/**
	 * Get notes (Chats)
	 * For Users and Admin
	 */
	NOTES_URL : API_URL + 'notes',
	
	/**
	 * Get notes (Chats)
	 * For Users and Admin
	 */
	LEAVE_COMMENT_URL : API_URL + 'leaves',

	/**
	 * Get notes (Chats)
	 * For Users and Admin
	 */
	SEARCH_INCHARGES : API_URL + 'search-autocomplete'
}
