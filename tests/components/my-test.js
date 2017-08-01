import Component from '../../src/component'
import PropTypes from '../../src/prop-types'

customElements.define('my-test', class extends Component {
  static propTypes = {
    camelCase: PropTypes.string(),
    aNumber: PropTypes.number({
      defaultValue: 42
    }),
    requiredProp: PropTypes.string({
      required: true
    })
  }

  render () {
    return (
      <div><button>Click me</button><slot/>{this.aNumber}</div>
    )
  }
})
