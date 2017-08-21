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

  renderCss () {
    return (
      <style>
        {styles}
      </style>
    )
  }

  render () {
    return (
      <label>
        <span
          id="checkbox"
          tabindex="0"
          aria-checked={this.checked}
          aria-disabled={this.disabled}
          __skip
          dangerouslySetInnerHTML={this.checked ? checked : unchecked} />
        <slot />
      </label>
    )
  }

  toggle () {
    this.checked = !this.checked
  }

  normalizeIcon (icon) {
    return icon.substring(1, icon.length - 2)
  }
})
