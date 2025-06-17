import fs from "fs";
import path from "path";
import { DefaultTheme, defineConfig } from "vitepress";

const ROOT = "posts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "漢語語法",
  description:
    "繁體中文漢語語法網站，內容改寫自教科書並經 AI 擴充，包含語法解說、例句翻譯、練習測驗與台灣常用語法參考。",
  lang: "zh-TW",
  base: "/zh-tw-grammar/",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    sidebar: makeSidebar(),

    socialLinks: [
      { icon: "github", link: "https://github.com/patarapolw/zh-tw-grammar" },
    ],
    // search: {
    //   provider: "local",
    //   options: {
    //     miniSearch: {
    //       options: {
    //         tokenize
    //       }
    //     }
    //   }
    // },
  },
});

function makeSidebar(root = ROOT): DefaultTheme.Sidebar {
  return fs.readdirSync(root).map((f1) => {
    const base1 = f1.replace(/\.md$/, "");
    const [n, s] = base1.split("-", 2);

    const p1 = path.join(root, f1);

    let indexLink: string | undefined = undefined;
    const ls2 = fs
      .readdirSync(p1)
      .map((f2) => {
        const base2 = f2.replace(/\.md$/, "");
        const [n, s] = base2.split("-", 2);
        const i = Number(n);

        return {
          text: i ? `(${i}) ${s}` : base2,
          base: `/${root}/`,
          link: [f1, base2].join("/"),
        };
      })
      .filter((o) => {
        if (o.text === "README") {
          indexLink = o.link;
          return false;
        }
        return true;
      });

    console.log(indexLink);

    const i = Number(n);

    return {
      text: i ? `${i}. ${s}` : base1,
      base: `/${root}/`,
      link: indexLink,
      items: ls2,
    };
  });
}
