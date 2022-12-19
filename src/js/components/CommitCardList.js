import CommitCard from './CommitCard'
import GitHubApi from '../modules/GitHubApi'
import formatterDate from '../utils/formatterDate'
export default class CommitCardList {
	constructor(container, createCard, formatterDate) {
		this.container = container
		this.createCard = createCard
		this.formatterDate = formatterDate
	}
	renderCard(cards) {
		const addCard = this.addCard.bind(this)
		cards.forEach((item) => {
			addCard(item, this.formatterDate)
		})
	}
	addCard(card, formatterDate) {
		const { createCard } = this.createCard(card, formatterDate)
		this.container.appendChild(createCard)
	}
	removeCard() {
		while (this.container.firstChild) {
			this.container.removeChild(this.container.firstChild)
		}
	}
}

const swiperWrapper = document.querySelector('.swiper-wrapper')
const commitCard = (card, formatterDate) => new CommitCard(card, formatterDate)
const commitCardList = new CommitCardList(
	swiperWrapper,
	commitCard,
	formatterDate
)
const gitHubApi = new GitHubApi()
gitHubApi
	.getCommit()
	.then((res) => {
		if (res.ok) {
			return res.json()
		}
		return Promise.resolve(res.status)
	})
	.then((res) => commitCardList.renderCard(res))
	.catch((error) => console.log(error))
