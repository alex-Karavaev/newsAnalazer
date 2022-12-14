function getThreeCards(setItem, getItem, numberCards, key) {
	const nextItem = []

	const threeCards = getItem(key).filter((item, i) => {
		if (i < numberCards) {
			return item
		} else nextItem.push(item)
	})
	setItem(key, nextItem)
	return threeCards
}

export default getThreeCards
