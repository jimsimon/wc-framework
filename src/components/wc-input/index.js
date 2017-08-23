import {html} from 'lit-html'
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

  render () {
    return html`
      <style>
        ${styles}
      </style>
      <slot name="prefix"></slot>
      <input type="text" value="banana">
      <slot name="suffix"></slot>
    `
  }
})
