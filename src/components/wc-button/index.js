import {Component, PropTypes} from '../../index'
import styles from './styles.css'

customElements.define('wc-button', class WcButton extends Component {
  static get propTypes () {
    return {
      disabled: PropTypes.boolean({
        defaultValue: false
      }),
      raised: PropTypes.boolean()
    }
  }

  static get hostAttributes () {
    return {
      'role': 'button'
    }
  }

  constructor () {
    super()
    this.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
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
    this.setAttribute('tabindex', this.disabled ? '-1': '0')
    this.setAttribute('aria-disabled', this.disabled)
    return <slot />
  }
})
