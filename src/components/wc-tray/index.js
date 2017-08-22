import { Component, PropTypes } from '../../index'
import styles from './styles.css'

customElements.define('wc-tray', class WcTray extends Component {
  static get propTypes () {
    return {
      open: PropTypes.boolean({
        defaultValue: false
      })
    }
  }

  constructor () {
    super()
    this.addEventListener('click', (event) => {
      const content = this.shadowRoot.querySelector('div')
      if (!event.composedPath().includes(content)) {
        this.removeAttribute('open')
      }
    })
  }

  renderCss () {
    return (
      <style>
        {styles}
      </style>
    )
  }

  render () {
    return (
      <div>
        <slot />
      </div>
    )
  }

  normalizeIcon (icon) {
    return icon.substring(1, icon.length - 2)
  }
})
