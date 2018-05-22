module.exports = {
  title: 'awesome-bookmarks',
  description: 'coming soon',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '库', link: '/repository/' },
      { text: '文章', link: '/article/' },
      // { text: '工具', link: 'https://google.com' },
      // { text: '网站', link: 'https://google.com' },
      { text: '面试', link: '/interview/' }
    ],
    // sidebar: [
    //   '/',
    //   '/page-a',
    //   ['/page-b', 'Explicit link text']
    // ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  }
}
