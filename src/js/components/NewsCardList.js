export default class NewsCardList {
	constructor(container, createCard) {
		this.container = container
		this.createCard = createCard
	}
	renderCard(cards) {
		const addCard = this.addCard.bind(this)
		cards.forEach((item) => {
			addCard(item)
		})
	}
	addCard(card) {
		const { createCard } = this.createCard(card)
		this.container.appendChild(createCard)
	}
	removeCard() {
		while (this.container.firstChild) {
			this.container.removeChild(this.container.firstChild)
		}
	}
}
