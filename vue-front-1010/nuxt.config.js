module.exports = {


    // 幻灯片插件
    plugins: [
        { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false }
    ],
    css: [
        'swiper/dist/css/swiper.css'
    ],


  /*
  ** Headers of the page
  */
  head: {
    title: ' 一师讲堂 - 专为一师师生提供优质学习平台！ ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: ' 一师讲堂 - 专为一师师生提供优质学习平台 ' },
      { hid: 'description', name: 'description', content: '一师讲堂 - 为两万一师师生提供优质学习平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

