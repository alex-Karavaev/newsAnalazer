const entries = [
	{
		name: 'index',
		entry: './src/index.js',
	},
	{
		name: 'about',
		entry: './src/pages/about.js',
	},
]

const htmlPages = [
	{
		template: './src/index.html',
		filename: 'index.html',
		chunks: ['index'],
	},
	{
		template: './src/pages/about.html',
		filename: 'pages/about.html',
		chunks: ['about'],
	},
]

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = entries.reduce((entries, component) => {
	entries[component.name] = path.join(__dirname, component.entry)
	return entries
}, {})

const htmlGenerators = htmlPages.reduce((entries, component) => {
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
		//	assetModuleFilename: 'images/[name][ext][query]',
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
