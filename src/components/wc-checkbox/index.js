import { Component, PropTypes } from '../../index'
import styles from './styles.css'
import checkedCheckbox from 'material-design-icons/toggle/svg/production/ic_check_box_24px.svg'
import uncheckedCheckbox from 'material-design-icons/toggle/svg/production/ic_check_box_outline_blank_24px.svg'

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

  static get hostAttributes () {
    return {
      'tabindex': '0',
      'role': 'checkbox'
    }
  }

  constructor () {
    super()
    this.addEventListener('click', this.toggle)
  }

  renderCss () {
    return (
      <style>
        {styles}
      </style>
    )
  }

  render () {
    this.setAttribute('aria-checked', `${this.checked}`)
    this.setAttribute('aria-disabled', this.disabled)

    return (
      <div id="container">
        <span id="checkbox" __skip dangerouslySetInnerHTML={this.checked ? checkedCheckbox : uncheckedCheckbox}></span>
        <span><slot /></span>
      </div>
    )
  }

  toggle () {
    this.checked = !this.checked
  }

  normalizeIcon (icon) {
    return icon.substring(1, icon.length - 2)
  }
})
