import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const PageTransitions: QuartzComponent = () => null

  PageTransitions.afterDOMLoaded = `
    const breadcrumbSelectors = [".breadcrumb-container"]
    const noteSelectors = [".article-title", ".center article"]

    const forEachTarget = (selectors, fn) => {
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => fn(el))
      })
    }

    const clearClasses = (el) => {
      el.classList.remove("note-roll-enter", "note-roll-exit", "crumb-fade-enter", "crumb-fade-exit")
    }

    const applyPageReveal = () => {
      forEachTarget(breadcrumbSelectors, (el) => {
        clearClasses(el)
        void el.offsetWidth
        el.classList.add("crumb-fade-enter")
      })
      forEachTarget(noteSelectors, (el) => {
        clearClasses(el)
        void el.offsetWidth
        el.classList.add("note-roll-enter")
      })
    }

    const applyPageExit = () => {
      forEachTarget(breadcrumbSelectors, (el) => {
        clearClasses(el)
        el.classList.add("crumb-fade-exit")
      })
      forEachTarget(noteSelectors, (el) => {
        clearClasses(el)
        el.classList.add("note-roll-exit")
      })
    }

    document.addEventListener("prenav", applyPageExit)
    document.addEventListener("nav", applyPageReveal)
    applyPageReveal()
  `

  return PageTransitions
}) satisfies QuartzComponentConstructor
