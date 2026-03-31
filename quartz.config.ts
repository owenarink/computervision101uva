import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Computer Vision Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "owenarink.github.io/computervision101uva",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Sans",
        body: "IBM Plex Sans",
        code: "IBM Plex Mono",
        title: "IBM Plex Sans",
      },
      colors: {
        lightMode: {
          light: "#fff6de",
          lightgray: "#e6d7b1",
          gray: "#9e8f6d",
          darkgray: "#4a3521",
          dark: "#23170d",
          secondary: "#d94f04",
          tertiary: "#0ea5a4",
          highlight: "rgba(217, 79, 4, 0.12)",
          textHighlight: "#ffe082aa",
        },
        darkMode: {
          light: "#1b130c",
          lightgray: "#463728",
          gray: "#8f7e63",
          darkgray: "#f6dfb6",
          dark: "#fff7e8",
          secondary: "#ff7a18",
          tertiary: "#56d7d2",
          highlight: "rgba(255, 122, 24, 0.15)",
          textHighlight: "#ffd54f66",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Disabled for local/offline use. Re-enable before deployment if you want OG images.
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
