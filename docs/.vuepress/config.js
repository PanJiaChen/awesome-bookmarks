module.exports = {
  title: 'awesome-bookmarks',
  description: 'coming soon',
  base:'/awesome-bookmarks/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '库', link: '/repository/' },
      { text: '文章', link: '/article/' },
      // { text: '工具', link: 'https://google.com' },
      { text: '网站', link: '/website/' },
      { text: '面试', link: '/interview/' }
    ],
    // sidebar: [
    //   '/',
    //   '/page-a',
    //   ['/page-b', 'Explicit link text']
    // ]
    lastUpdated: '上次更新',
    repo: 'PanJiaChen/awesome-bookmarks',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  }
}
