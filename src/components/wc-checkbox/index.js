import {html} from 'lit-html'
import { Component, PropTypes } from '../../index'
import styles from './styles.css'
import unchecked from './unchecked.svg'
import checked from './checked.svg'

customElements.define('wc-checkbox', class WcCheckbox extends Component {
  static get propTypes () {
    return {
      checked: PropTypes.boolean({
        defaultValue: false
      }),
      disabled: PropTypes.boolean({
        defaultValue: false
      })
    }
  }

  constructor () {
    super()
    this.addEventListener('click', this.toggle)
    this.addEventListener('keydown', function (event) {
      if (event.key === ' ') {
        this.click()
      }
    })
  }

  render () {
    return html`
      <style>
        ${styles}
      </style>
      <label>
        <span
          id="checkbox"
          tabindex="0"
          aria-checked$=${this.checked}
          aria-disabled$=${this.disabled}>
            ${this.unsafe(this.checked ? checked : unchecked)}
        </span>
        <slot></slot>
      </label>
    `
  }

  toggle () {
    this.checked = !this.checked
  }
})
