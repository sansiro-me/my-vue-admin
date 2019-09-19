module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/blog_api': {
        target: 'http://api.521plus.com',
        changeOrigin: true,
      }
    }
  }
}