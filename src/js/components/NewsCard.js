export default class NewsCard {
	constructor(data, formatterDate) {
		this.data = data
		this.formatterDate = formatterDate
	}
	get createCard() {
		const date = new Date(this.data.publishedAt)
		const data = this.data
		const card = document.createElement('article')
		card.classList.add('card')
		card.insertAdjacentHTML(
			'afterbegin',
			`
                        <div class="card__img" style="background-image: url(${
							data.urlToImage
						})"></div>
							<div class="card__container">
								<span class="card__date">${this.formatterDate(date)}</span>
								<h3 class="card__title">
									${data.title}
								</h3>
								<p class="card__news">
									${data.description}
								</p>
								<span class="card__source">${data.source.name}</span>
							</div>
        `
		)
		return card
	}
}
