export default class CommitCard {
	constructor(data, formatterDate) {
		this.data = data
		this.formatterDate = formatterDate
	}
	get createCard() {
		const data = this.data

		const date = new Date(data.commit.author.date)

		const card = document.createElement('div')
		card.classList.add('swiper-slide')
		card.insertAdjacentHTML(
			'afterbegin',
			`
                        <div class="commit__card">
									<span class="commit__date"
										> ${this.formatterDate(date)}</span
									>
									<div class="commit__details">
										<img
											class="commit__img"
											src="${data.author.avatar_url}"
											alt=""
										/>
										<h3 class="commit__name">
											${data.commit.author.name}
										</h3>
										<p class="commit__email">
											${data.commit.author.email}
										</p>
									</div>
									<p class="commit__description">
										${data.commit.message}
									</p>
								</div>
        `
		)
		return card
	}
}
