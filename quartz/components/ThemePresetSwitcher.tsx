import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const ThemePresetSwitcher: QuartzComponent = () => (
    <div class="theme-preset-switcher">
      <button class="theme-preset-toggle" aria-label="Theme presets">
        Themes
      </button>
      <div class="theme-preset-options">
        <button data-theme-preset="retroma">Retroma</button>
        <button data-theme-preset="retro-windows">Retro Windows</button>
        <button data-theme-preset="retronotes">Retronotes</button>
      </div>
    </div>
  )

  ThemePresetSwitcher.afterDOMLoaded = `
    const storageKey = "theme-preset"

    const applyPreset = (preset) => {
      document.documentElement.setAttribute("data-theme-preset", preset)
      localStorage.setItem(storageKey, preset)
      document.querySelectorAll(".theme-preset-options button").forEach((button) => {
        button.classList.toggle("active", button.dataset.themePreset === preset)
      })
    }

    const setupThemeSwitcher = () => {
      const switcher = document.querySelector(".theme-preset-switcher")
      const toggle = document.querySelector(".theme-preset-toggle")
      const buttons = document.querySelectorAll(".theme-preset-options button")
      if (!switcher || !toggle || buttons.length === 0) return

      const savedPreset = localStorage.getItem(storageKey) ?? "retroma"
      applyPreset(savedPreset)

      const onToggle = () => switcher.classList.toggle("open")
      toggle.addEventListener("click", onToggle)
      window.addCleanup(() => toggle.removeEventListener("click", onToggle))

      buttons.forEach((button) => {
        const onClick = () => {
          applyPreset(button.dataset.themePreset || "retroma")
          switcher.classList.remove("open")
        }
        button.addEventListener("click", onClick)
        window.addCleanup(() => button.removeEventListener("click", onClick))
      })
    }

    document.addEventListener("nav", setupThemeSwitcher)
    setupThemeSwitcher()
  `

  return ThemePresetSwitcher
}) satisfies QuartzComponentConstructor
