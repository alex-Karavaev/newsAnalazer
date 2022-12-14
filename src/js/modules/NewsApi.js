class NewsApi {
	constructor(text, searchDates) {
		this.text = text
		this.searchDates = searchDates()
	}
	get getNews() {
		const text = this.text
		const searchDates = this.searchDates
		let url =
			'https://newsapi.org/v2/everything?' +
			`q=${text}&` +
			'language=ru&' +
			`from=${searchDates.weekAgo}&` +
			`to=${searchDates.toDay}&` +
			'sortBy=popularity&' +
			'apiKey=d9a08bfcb5264cb3b7c1fd52bae77503'

		return fetch(url)
	}
}
export default NewsApi
