import {html} from 'lit-html'
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

  render () {
    return html`
      <style>
        ${styles}
      </style>
      <div>
        <slot></slot>
      </div>
    `
  }
})
