import NewsCard from '../components/NewsCard'
import NewsCardList from '../components/NewsCardList'
import NewsApi from '../modules/NewsApi'
import DataStorage from '../modules/DataStorage'
import getThreeCards from '../utils/getThreeCards'
import formatterDate from '../utils/formatterDate'
import searchDates from '../utils/searchDates'

import {
	PRELOADER,
	NEWS_WRAPPER,
	NEWS_HEADLINES,
	NEWS_CONTAINER,
	NEWS_NOT_FOUND,
	TEXT,
	NEWS_BTN,
	SEARCH_BTN,
	NUMBER_CARDS,
	KEY,
	PREFIX,
} from '../constants/constants'
class SearchInput {
	constructor(param) {
		this.prefix = param.constants.PREFIX
		this.searchBtn = param.constants.SEARCH_BTN
		this.newsWrapper = param.constants.NEWS_WRAPPER
		this.newsBtn = param.constants.NEWS_BTN
		this.newsNotFound = param.constants.NEWS_NOT_FOUND
		this.text = param.constants.TEXT
		this.key = param.constants.KEY
		this.preloaderElement = param.constants.PRELOADER
		this.headlinesElement = param.constants.NEWS_HEADLINES
		this.newsContainer = param.constants.NEWS_CONTAINER

		this.numberCards = param.constants.NUMBER_CARDS
		this.key = param.constants.KEY
		this.prefix = param.constants.PREFIX

		this.getThreeCards = param.utils.getThreeCards
		this.formatterDate = param.utils.formatterDate
		this.searchDates = param.utils.searchDates

		this.NewsCard = param.components.NewsCard
		this.NewsCardList = param.components.NewsCardList

		this.NewsApi = param.modules.NewsApi
		this.dataStorage = new param.modules.DataStorage(this.prefix)
		this.card = (card) => new this.NewsCard(card, formatterDate)

		this.list = new this.NewsCardList(this.newsContainer, this.card)
	}
	setHandlers() {
		this.searchBtn.addEventListener('click', async (event) => {
			event.preventDefault()
			const deleteItem = this.dataStorage.delete.bind(this.dataStorage)
			const removeCard = this.list.removeCard.bind(this.list)
			deleteItem(this.key)
			removeCard()
			const getData = this.getData.bind(this)
			const searchInput = this.searchInput.bind(this)
			const validateValue = this.validateValue.bind(this)
			this.newsBtn.classList.remove('news__btn_visible')
			this.newsNotFound.classList.remove('news__not-found_visible')
			if (validateValue(this.text)) {
				await getData(this.text.value)
				this.preloaderElement.classList.remove(
					'circle-preloader_visible'
				)

				this.headlinesElement.classList.add('news__headlines_visible')
				searchInput()
			}
			if (this.newsContainer.hasChildNodes()) {
				this.newsBtn.classList.add('news__btn_visible')
			} else {
				this.newsNotFound.classList.add('news__not-found_visible')
				this.headlinesElement.classList.remove(
					'news__headlines_visible'
				)
			}
		})
		this.newsBtn.addEventListener('click', () => {
			this.searchInput()
			if (!this.dataStorage.getItem(this.key).length) {
				this.newsBtn.classList.remove('news__btn_visible')
			}
		})
	}
	getData(text) {
		const newsApi = new this.NewsApi(text, this.searchDates)
		return newsApi.getNews
			.then((res) => {
				if (res.ok) {
					return res.json()
				}
				return Promise.reject(res.status)
			})
			.then((res) => this.dataStorage.setItem(this.key, res.articles))
			.catch((error) => console.log(error))
	}

	validateValue(text) {
		this.headlinesElement.classList.remove('news__headlines_visible')
		if (text.value.length) {
			this.newsWrapper.classList.add('news__wrapper_visible')
			this.preloaderElement.classList.add('circle-preloader_visible')
			text.classList.remove('search__text_border')
			return true
		} else {
			text.classList.add('search__text_border')
			this.newsWrapper.classList.remove('news__wrapper_visible')
			return false
		}
	}
	searchInput() {
		const setItem = this.dataStorage.setItem.bind(this.dataStorage)
		const getItem = this.dataStorage.getItem.bind(this.dataStorage)
		const renderCard = this.list.renderCard.bind(this.list)
		renderCard(
			this.getThreeCards(setItem, getItem, this.numberCards, this.key)
		)
	}
}

const searchValue = new SearchInput({
	components: {
		NewsCard,
		NewsCardList,
	},
	modules: {
		NewsApi,
		DataStorage,
	},
	utils: {
		getThreeCards,
		formatterDate,
		searchDates,
	},

	constants: {
		PRELOADER,
		NEWS_WRAPPER,
		NEWS_HEADLINES,
		NEWS_CONTAINER,
		NEWS_NOT_FOUND,
		TEXT,
		NUMBER_CARDS,
		KEY,
		PREFIX,
		NEWS_BTN,
		SEARCH_BTN,
	},
})
searchValue.setHandlers()
