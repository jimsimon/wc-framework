import { Component, PropTypes } from '../../index'
import styles from './styles.css'

customElements.define('wc-input', class WcInput extends Component {
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
        <slot name="prefix" />
        <input></input>
        <slot name="suffix" />
      </div>
    )
  }

  normalizeIcon (icon) {
    return icon.substring(1, icon.length - 2)
  }
})
