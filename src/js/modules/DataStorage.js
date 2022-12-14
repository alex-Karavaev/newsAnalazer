export default class DataStorage {
	constructor(dbPrefix) {
		this.dbPrefix = dbPrefix
	}

	setItem(key, value) {
		let _value = JSON.stringify(value)

		localStorage.setItem(this.dbPrefix + key, _value)

		return true
	}

	getItem(key) {
		let data = localStorage.getItem(this.dbPrefix + key)
		if (data === null) return false

		let _data = false

		try {
			_data = JSON.parse(data)
		} catch (e) {
			console.error(e)
		}

		return _data
	}

	delete(key) {
		localStorage.removeItem(this.dbPrefix + key)
	}

	rowsCount() {
		return localStorage.length
	}

	drop() {
		const rowsCount = this.rowsCount()

		for (let i = 0; i < rowsCount; i++) {
			let key = localStorage.key(i)

			if (key.startsWith(this.dbPrefix)) this.delete(key)
		}
	}

	dropAll() {
		localStorage.clear()
	}
}
