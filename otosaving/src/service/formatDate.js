export default function (date) {
	var newDate = new Date(date);
	var day =
		newDate.getDay() >= 10 ? newDate.getDay() : "0" + newDate.getDay();
	var month =
		newDate.getMonth() >= 10
			? newDate.getMonth()
			: "0" + newDate.getMonth();
	return `${day}/${month}/${newDate.getFullYear()}`;
}
