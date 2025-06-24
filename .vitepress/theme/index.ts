import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import Collapse from "../components/Collapse.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("Collapse", Collapse);
  },
} satisfies Theme;
