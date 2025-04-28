import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:  "/appweb-trpr02-doc/StarWarsAttackDoc",
  title: "Star Wars Attack",
  description: "Revue de code sur Star Wars Attack",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      
    ],

    sidebar: [
      {
        text: "Revue de code",
        items: [
          { text: "Antoine Leclerc", link: "/antoine-leclerc" },
          { text: "Alexandre Wattel", link: "/alexandre-wattel" },
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
