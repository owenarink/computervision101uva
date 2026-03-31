import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const PageTransitions: QuartzComponent = () => null

  PageTransitions.afterDOMLoaded = `
    const selectors = [".breadcrumb-container", ".article-title", ".center article"]

    const forEachTarget = (fn) => {
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => fn(el))
      })
    }

    const clearClasses = (el) => {
      el.classList.remove("page-roll-enter", "page-roll-exit")
    }

    const applyPageReveal = () => {
      forEachTarget((el) => {
        clearClasses(el)
        void el.offsetWidth
        el.classList.add("page-roll-enter")
      })
    }

    const applyPageExit = () => {
      forEachTarget((el) => {
        clearClasses(el)
        el.classList.add("page-roll-exit")
      })
    }

    document.addEventListener("prenav", applyPageExit)
    document.addEventListener("nav", applyPageReveal)
    applyPageReveal()
  `

  return PageTransitions
}) satisfies QuartzComponentConstructor
