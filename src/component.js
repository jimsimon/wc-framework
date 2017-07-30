import { elementOpen, elementClose, text, patch } from 'incremental-dom'

export default class Component extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.props = this._setupProps()
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

  _setupProps () {
    const propValues = {}
    const { constructor: Type } = this
    const propTypes = Type.propTypes || {}
    for (const [name, propType] of Object.entries(propTypes)) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: function () {
          return propValues[name]
        },
        set: function (value) {
          propType.validate(name, value)
          propValues[name] = value
        }
      })

      this[name] = this.getInitialValue(name, propType)
    }
  }

  getInitialValue(name, propType) {
    let initalValue = this.getAttribute(name)
    if (initalValue === undefined || initalValue === null) {
      initalValue = propType.defaultValue
    } else {
      initalValue = propType.deserialize(initalValue)
    }
    return initalValue
  }
}
