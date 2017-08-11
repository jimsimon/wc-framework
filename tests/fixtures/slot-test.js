import Component from '../../src/component'

customElements.define('slot-test', class extends Component {
  render () {
    return (
      <slot />
    )
  }
})
