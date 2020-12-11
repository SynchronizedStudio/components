const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {

    // configureWebpack: {

  //   	externals: {
  //   smooth-scrollbar: 'smooth-scrollbar'
  // },

    //     plugins: [new ExtractCssChunks()],
		  // module: {
		  //   rules: [
		  //     {
		  //       test: /\.css$/i,
		  //       use: [
		  //         {
		  //           loader: ExtractCssChunks.loader,
		  //           options: {
		  //             esModule: true,
		  //           },
		  //         },
		  //         'css-loader',
		  //       ],
		  //     },
		  //   ],
		  // },
    // },

    css: {
      // extract: false
      extract: process.env.NODE_ENV === 'production' ? {
	     ignoreOrder: true,
	  } : false,
    },

    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: true
        }
    }
}