const sidebarMap = require("./sidebarMap");
const container = require("markdown-it-container");

function createContainer(klass, defaultTitle) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        if ((token.markup = ":::")) {
          console.log(token);
        }
        const info = token.info
          .trim()
          .slice(klass.length)
          .trim();
        if (token.nesting === 1) {
          return `<div class="${klass} custom-block"><p class="custom-block-title">${info}</p>\n`;
        } else {
          return `</div>\n`;
        }
      }
    }
  ];
}

module.exports = {
  title: "awesome-bookmarks",
  description: "coming soon",
  base: "/awesome-bookmarks/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "库", link: "/repository/" },
      { text: "文章", link: "/article/" },
      // { text: '工具', link: 'https://google.com' },
      { text: "网站", link: "/website/" },
      { text: "面试", link: "/interview/" },
      { text: "Blog", link: "/blog/" }
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
  markdown: {
    config: md => {
      md.use(...createContainer("tip", "TIP"))
        .use(...createContainer("warning", "WARNING"))
        .use(...createContainer("danger", "WARNING"))
        // explicitly escape Vue syntax
        .use(container, "v-pre", {
          render: (tokens, idx) =>
            tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
        });
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@public": "./public"
      }
    }
  },
  ga: "UA-109340118-1"
};

function genSidebarConfig(type) {
  const sidebar = sidebarMap[type];
  return [
    {
      title: sidebar.title,
      collapsable: false,
      children: sidebar.children
    }
  ];
}
