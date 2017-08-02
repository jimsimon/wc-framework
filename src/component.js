import { elementOpen, elementClose, text, patch } from 'incremental-dom'
import debounce from 'lodash.debounce'
import PropTypeRegistry from './prop-type-registry'

export default class Component extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._defineProperties()
  }

  static get observedAttributes () {
    this._propTypeRegistry = new PropTypeRegistry(this.propTypes)
    return this._propTypeRegistry.attributeNames
  }

  attributeChangedCallback (attributeName, oldValue, newValue) {
    const {constructor: Type} = this
    const propType = Type._propTypeRegistry.propTypesByAttributeName.get(attributeName)
    console.log(`attribute ${attributeName} changed from ${oldValue} to ${newValue}`)
    this[propType.name] = propType.deserialize(newValue)
  }

  connectedCallback () {
    console.log('connected')
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

  _renderComponent = debounce(function () {
    console.log('renderComponent called')
    patch(this.shadowRoot, () => {
      this.renderCss()
      this.render()
    })
  })

  _defineProperties () {
    const propValues = {}
    const { constructor: Type } = this
    for (const [name, propType] of Type._propTypeRegistry.propTypesByPropName) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: function () {
          return propValues[name]
        },
        set: function (value) {
          console.log(`Property ${name} set to ${value}`)
          propType.validate(name, value)
          propValues[name] = value
          this._renderComponent()
        }
      })
      this[name] = this._getInitialValue(propType)
    }
  }

  _getInitialValue(propType) {
    let initalValue = this.getAttribute(propType.attributeName)
    if (initalValue === undefined || initalValue === null) {
      initalValue = propType.defaultValue
    } else {
      initalValue = propType.deserialize(initalValue)
    }
    return initalValue
  }
}
