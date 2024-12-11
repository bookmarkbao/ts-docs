import sidebarItems from "./sidebar";
export default {
  title: "daxiang blog",
  description: "a docs for daxiang development",
  base: "/ts-docs/", // 添加这行，设置基础路径
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],
    sidebar: [
      {
        text: "sidebar",
        items: sidebarItems,
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
};
