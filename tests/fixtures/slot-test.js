import {html} from 'lit-html'
import Component from '../../src/component'

customElements.define('slot-test', class extends Component {
  render () {
    return html`
      <slot></slot>
    `
  }
})
