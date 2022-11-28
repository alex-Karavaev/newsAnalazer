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
		entry: './src/pages/about/about.js',
		template: './src/pages/about/about.html',
		filename: 'pages/about/about.html',
		chunks: ['about'],
	},
	{
		name: 'analytics',
		entry: './src/pages/analytics/analytics.js',
		template: './src/pages/analytics/analytics.html',
		filename: 'pages/analytics/analytics.html',
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
		filename: '[name].[contenthash].js',
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
					filename: 'images/[hash][ext][query]',
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
