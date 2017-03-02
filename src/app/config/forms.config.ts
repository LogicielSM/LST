/*******************************/
	/* Validation Patterns */
/*******************************/
export const PATTERNS = {
	email 	: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
	website : "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$",
	zip 	: "^[0-9]+$",
	number  : "^[0-9]+$",
	phone   : "^[0-9]+$",
}

/*****************************/
	/* LEAVE PRIORITIES */
/*****************************/
export const LEAVE_PRIORITIES = {
	low    : 'Low', 
	medium : 'Medium', 
	high   : 'High', 
}

/*****************************/
	/* MONTHS */
/*****************************/
export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]