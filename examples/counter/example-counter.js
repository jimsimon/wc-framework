// Normally we would just do "import Component, { PropTypes } from 'wc-framework', but since we live inside the same
// repo we need to do it this way
import { Component, PropTypes } from 'wc-framework/src/index'

customElements.define('example-counter', class extends Component {
  static get propTypes() {
    return {
      count: PropTypes.number({
        required: true,
        defaultValue: 0
      }),
      banana: PropTypes.boolean()
    }
  }

  connectedCallback () {
    super.connectedCallback()

    // Increment count by 1 every second
    this.intervalHandle = setInterval(() => this.count++, 1000)
  }

  disconnectedCallback () {
    clearInterval(this.intervalHandle)
  }

  render () {
    return <span>{this.count}</span>
  }
})
