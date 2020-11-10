export default function (date) {
	var newDate = new Date(date);
	var day =
		newDate.getDate() >= 10 ? newDate.getDate() : "0" + newDate.getDate();
	var month =
		newDate.getMonth() + 1 >= 10
			? newDate.getMonth() +1
			: "0" + (newDate.getMonth()+1);
	return `${day}/${month}/${newDate.getFullYear()}`;
}
