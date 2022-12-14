export default function searchDates() {
	const date = new Date()
	const searchDates = {}
	const toDay = date.toISOString().match(/\d+-\d+-\d+/)[0]

	date.setDate(date.getDate() - 7)
	const weekAgo = date.toISOString().match(/\d+-\d+-\d+/)[0]

	searchDates.toDay = toDay
	searchDates.weekAgo = weekAgo

	return searchDates
}
