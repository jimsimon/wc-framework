import Component from '../../src/component'
import PropTypes from '../../src/prop-types'

customElements.define('my-test', class extends Component {
  static get propTypes() {
    return {
      optionalString: PropTypes.string(),
      optionalNumber: PropTypes.number({
        defaultValue: 42
      }),
      requiredString: PropTypes.string({
        required: true
      })
    }
  }

  render () {
    return (
      <table>
        <tbody>
        <tr><th>optionalString</th>{this.optionalString}</tr>
        <tr><th>optionalNumber</th>{this.optionalNumber}</tr>
        <tr><th>requiredString</th>{this.requiredString}</tr>
        </tbody>
      </table>
    )
  }
})
