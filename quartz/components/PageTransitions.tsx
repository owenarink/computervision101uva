import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const PageTransitions: QuartzComponent = () => null

  PageTransitions.afterDOMLoaded = `
    const applyPageReveal = () => {
      const page = document.querySelector(".center")
      if (!page) return
      page.classList.remove("page-roll-enter")
      void page.offsetWidth
      page.classList.add("page-roll-enter")
    }

    document.addEventListener("nav", applyPageReveal)
    applyPageReveal()
  `

  return PageTransitions
}) satisfies QuartzComponentConstructor
