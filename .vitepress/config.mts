import fs from "fs";
import path from "path";
import { DefaultTheme, defineConfig } from "vitepress";

const ROOT= 'posts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "漢語語法",
  description:
    "Chinese grammar from a textbook, converted and filled to traditional Chinese with AI",
  lang: "zh-TW",
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
          link: [root, f1, base2].join("/"),
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
      link: indexLink,
      items: ls2,
    };
  });
}
