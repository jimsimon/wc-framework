import { elementOpen, elementClose, text, patch } from 'incremental-dom'

export default class Component extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.props = this._resolveProps()
    console.log(this.props)
  }

  connectedCallback () {
    this._renderComponent()
  }

  renderCss () {
    elementOpen('style')
    text(
`:host {
  contain: content;
}`
    )
    elementClose('style')
  }

  render () {}

  _renderComponent () {
    patch(this.shadowRoot, () => {
      this.renderCss()
      this.render()
    })
  }

  _resolveProps () {
    const initialProps = {}
    const { constructor: Type } = this
    const propTypes = Type.propTypes || {}
    for (const [key, value] of Object.entries(propTypes)) {
      const initialValue = value.deserialize(this.getAttribute(key)) || value.defaultValue
      value.validate(key, initialValue)
      initialProps[key] = initialValue
    }
    return initialProps
  }
}
