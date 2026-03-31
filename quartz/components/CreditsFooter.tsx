import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

export default (() => {
  const CreditsFooter: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <footer class={`${displayClass ?? ""} credits-footer`}>
        <p>Maintained by Owen Arink, University of Amsterdam.</p>
        <details class="credits-disclosure">
          <summary>Credits</summary>
          <ul>
            <li>
              Built with <a href="https://quartz.jzhao.xyz/">Quartz</a>
            </li>
            <li>
              Source on <a href="https://github.com/owenarink/computervision101uva">GitHub</a>
            </li>
            <li>
              Quartz community on <a href="https://discord.gg/cRFFHYye7t">Discord</a>
            </li>
          </ul>
        </details>
      </footer>
    )
  }

  CreditsFooter.css = style
  return CreditsFooter
}) satisfies QuartzComponentConstructor
