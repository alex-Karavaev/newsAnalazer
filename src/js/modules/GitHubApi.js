export default class GitHubApi {
	constructor() {}
	getCommit() {
		return fetch(
			'https://api.github.com/repos/alex-Karavaev/newsAnalazer/commits'
		)
	}
}
