export default class ComponentBase extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.rerender()
  }

  rerender = () => {
    this.renderCss()
    this.render()
  }

  renderCss () {}

  render () {}
}
