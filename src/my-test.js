import Component from './component'
import PropTypes from './prop-types'

export default class MyTest extends Component {
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
      <div><slot/></div>
    )
  }
}

customElements.define('my-test', MyTest)
