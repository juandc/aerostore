const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  webpack: (config, { dev }) => {
    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [{
            handler: 'networkFirst',
            urlPattern: /^https.*/
          }]
        })
      )
    }

    return config
  }
}
