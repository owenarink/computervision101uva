import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const ThemePresetSwitcher: QuartzComponent = () => (
    <div class="theme-preset-switcher">
      <button class="theme-preset-toggle" aria-label="Theme presets">
        Themes
      </button>
      <div class="theme-preset-options">
        <button data-theme-preset="material-gruvbox">Material Gruvbox</button>
        <button data-theme-preset="nightfox">Nightfox</button>
        <button data-theme-preset="minimal-dracula">Minimal Dracula</button>
      </div>
    </div>
  )

  ThemePresetSwitcher.afterDOMLoaded = `
    const storageKey = "theme-preset"
    const root = document.documentElement

    const applyPreset = (preset) => {
      root.setAttribute("data-theme-preset", preset)
      localStorage.setItem(storageKey, preset)
      document.querySelectorAll(".theme-preset-options button").forEach((button) => {
        button.classList.toggle("active", button.dataset.themePreset === preset)
      })
    }

    const syncSwitcher = () => {
      const savedPreset = localStorage.getItem(storageKey) ?? "material-gruvbox"
      applyPreset(savedPreset)
    }

    if (!window.__themePresetInit) {
      window.__themePresetInit = true

      document.addEventListener("click", (event) => {
        const toggle = event.target.closest(".theme-preset-toggle")
        const option = event.target.closest(".theme-preset-options button")
        const switcher = document.querySelector(".theme-preset-switcher")
        if (!switcher) return

        if (toggle) {
          switcher.classList.toggle("open")
          return
        }

        if (option) {
          applyPreset(option.dataset.themePreset || "material-gruvbox")
          switcher.classList.remove("open")
          return
        }

        if (!event.target.closest(".theme-preset-switcher")) {
          switcher.classList.remove("open")
        }
      })
    }

    document.addEventListener("nav", syncSwitcher)
    syncSwitcher()
  `

  return ThemePresetSwitcher
}) satisfies QuartzComponentConstructor
