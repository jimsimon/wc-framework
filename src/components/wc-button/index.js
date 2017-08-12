import {Component, PropTypes} from '../../index'
import styles from './styles.css'

customElements.define('wc-button', class WcButton extends Component {
  static get propTypes () {
    return {
      raised: PropTypes.boolean()
    }
  }

  static get hostAttributes () {
    return {
      'tabindex': '0',
      'aria-role': 'button'
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
    return <slot />
  }
})
