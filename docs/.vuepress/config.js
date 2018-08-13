const sidebarMap = require("./sidebarMap");

module.exports = {
  title: "awesome-bookmarks",
  description: "个人收藏际夹 beta",
  base: "/awesome-bookmarks/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ]
  ],
  themeConfig: {
    nav: [{
        text: "首页",
        link: "/"
      },
      {
        text: "库",
        link: "/repository/"
      },
      {
        text: "文章",
        link: "/article/"
      },
      // { text: '工具', link: 'https://google.com' },
      {
        text: "网站",
        link: "/website/"
      },
      {
        text: "面试",
        link: "/interview/"
      },
      {
        text: "Blog",
        link: "/blog/"
      }
    ],
    sidebar: {
      "/article/": genSidebarConfig("article"),
      "/interview/": genSidebarConfig("interview"),
      "/blog/": genSidebarConfig("blog")
    },
    lastUpdated: "上次更新",
    repo: "PanJiaChen/awesome-bookmarks",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    sidebarDepth: 3
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@public": "./public"
      }
    }
  },
  ga: "UA-109340118-1",
  markdown: {
    config: md => {
      // use more markdown-it plugins!
      md.use(require("markdown-it-include"));
    }
  }
};

function genSidebarConfig(type) {
  const sidebar = sidebarMap[type];
  return [{
    title: sidebar.title,
    collapsable: false,
    children: sidebar.children
  }];
}
