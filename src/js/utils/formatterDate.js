export default function formatterDate(fullDate) {
	const date = fullDate.getDate()
	const month = fullDate.getMonth()
	const year = fullDate.getFullYear()
	const allMonths = [
		'январь',
		'февраль',
		'март',
		'апрель',
		'май',
		'июнь',
		'июль',
		'август',
		'сентябрь',
		'октябрь',
		'ноябрь',
		'декабрь',
	]
	const ruMonth = allMonths.filter((item, i) => {
		if (i === month) {
			return item
		}
	})
	const newDate = `${date} ${ruMonth}, ${year}`
	return newDate
}
