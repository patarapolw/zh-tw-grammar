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
    const p1 = path.join(root, f1);
    const base = `/${root}/`;

    let indexLink: string | undefined = undefined;

    const ls: DefaultTheme.SidebarItem[] = [];

    const sectMap = new Map<number, DefaultTheme.SidebarItem>();

    for (const f2 of fs.readdirSync(p1)) {
      const stem = f2.replace(/\.md$/, "");
      const link = [f1, stem].join("/");
      if (stem === "README") {
        indexLink = link;
        continue;
      }

      const [n, s] = stem.replace(/\(/g, " (").trimStart().split("-", 2);
      const i = Number(n);
      const text = i ? `(${i}) ${s}` : stem;

      const iFloor = i ? Math.floor(i) : null;
      const prev = iFloor ? sectMap.get(iFloor) : null;

      if (n.includes(".") && prev) {
        prev.items = prev.items || [];
        prev.items.push({ text, base, link });
      } else {
        const it: DefaultTheme.SidebarItem = {
          text,
          base,
          link,
          collapsed: true,
        };
        ls.push(it);

        if (iFloor) {
          sectMap.set(iFloor, it);
        }
      }
    }

    console.log(indexLink);

    const stem = f1.replace(/\.md$/, "");
    const [n, s] = stem.split("-", 2);
    const i = Number(n);
    const text = i ? `${i}. ${s}` : stem;

    return {
      text,
      base,
      link: indexLink,
      items: ls,
      collapsed: true,
    };
  });
}
