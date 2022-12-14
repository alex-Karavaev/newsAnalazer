const pages = [
	{
		name: 'index',
		entry: './src/index.js',
		template: './src/index.html',
		filename: 'index.html',
		chunks: ['index'],
	},
	{
		name: 'about',
		entry: './src/about/about.js',
		template: './src/about/about.html',
		filename: './about/about.html',
		chunks: ['about'],
	},
	{
		name: 'analytics',
		entry: './src/analytics/analytics.js',
		template: './src/analytics/analytics.html',
		filename: './analytics/analytics.html',
		chunks: ['analytics'],
	},
]

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = pages.reduce((entries, component) => {
	entries[component.name] = path.join(__dirname, component.entry)
	return entries
}, {})

const htmlGenerators = pages.reduce((entries, component) => {
	entries.push(
		new HtmlWebpackPlugin({
			inject: true,
			chunks: component.chunks,
			filename: component.filename,
			template: component.template,
		})
	)
	return entries
}, [])

module.exports = {
	entry,

	plugins: [...htmlGenerators],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext][query]',
					publicPath: '/',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},

			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
		],
	},
}
