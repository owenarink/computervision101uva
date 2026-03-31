import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const ThemeSwitcher: QuartzComponent = () => (
    <div class="cv-theme-switcher">
      <button class="cv-theme-switcher__toggle" type="button" aria-label="Theme switcher">
        Theme
      </button>
      <div class="cv-theme-switcher__menu">
        <button type="button" data-theme-name="material-gruvbox">
          Material Gruvbox
        </button>
        <button type="button" data-theme-name="minimal-dracula">
          Dracula
        </button>
      </div>
    </div>
  )

  ThemeSwitcher.afterDOMLoaded = `
    const themeStorageKey = "cv-theme"
    const themeLinkId = "cv-theme-stylesheet"

    const getBasePath = () => {
      const cssLink = document.querySelector('link[href$="index.css"]')
      if (!cssLink) return "/"
      const href = cssLink.getAttribute("href") || "/index.css"
      return href.replace(/index\\.css$/, "")
    }

    const themeHref = (themeName) => \`\${getBasePath()}static/themes/\${themeName}.css\`

    const ensureThemeLink = () => {
      let link = document.getElementById(themeLinkId)
      if (!link) {
        link = document.createElement("link")
        link.id = themeLinkId
        link.rel = "stylesheet"
        link.type = "text/css"
        link.setAttribute("data-persist", "true")
        document.head.appendChild(link)
      }
      return link
    }

    const applyTheme = (themeName) => {
      const link = ensureThemeLink()
      link.setAttribute("href", themeHref(themeName))
      localStorage.setItem(themeStorageKey, themeName)
      document.querySelectorAll(".cv-theme-switcher__menu button").forEach((button) => {
        button.classList.toggle("active", button.dataset.themeName === themeName)
      })
    }

    const syncTheme = () => {
      const savedTheme = localStorage.getItem(themeStorageKey) || "material-gruvbox"
      applyTheme(savedTheme)
    }

    if (!window.__cvThemeSwitcherInit) {
      window.__cvThemeSwitcherInit = true

      document.addEventListener("click", (event) => {
        const toggle = event.target.closest(".cv-theme-switcher__toggle")
        const option = event.target.closest(".cv-theme-switcher__menu button")
        const root = document.querySelector(".cv-theme-switcher")
        if (!root) return

        if (toggle) {
          root.classList.toggle("open")
          return
        }

        if (option) {
          applyTheme(option.dataset.themeName || "material-gruvbox")
          root.classList.remove("open")
          return
        }

        if (!event.target.closest(".cv-theme-switcher")) {
          root.classList.remove("open")
        }
      })
    }

    document.addEventListener("nav", syncTheme)
    syncTheme()
  `

  return ThemeSwitcher
}) satisfies QuartzComponentConstructor
