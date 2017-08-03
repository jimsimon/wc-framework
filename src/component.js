import { elementOpen, elementClose, text, patch } from 'incremental-dom'
import debounce from 'lodash.debounce'
import PropTypeRegistry from './prop-type-registry'

export default class Component extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._propValuesAtLastRender = {}
    this._propValues = {}
    this._defineProperties()
  }

  static get observedAttributes () {
    this._propTypeRegistry = new PropTypeRegistry(this.propTypes)
    return this._propTypeRegistry.attributeNames
  }

  attributeChangedCallback (attributeName, oldValue, newValue) {
    const {name, deserialize} = this.constructor._propTypeRegistry.propTypesByAttributeName.get(attributeName)
    console.log(`attribute ${attributeName} changed from ${oldValue} to ${newValue}`)
    this[name] = deserialize(newValue)
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

  shouldComponentRender (oldProps, newProps) {
    for (const [name, newValue] of Object.entries(newProps)) {
      const oldValue = oldProps[name]
      if (newValue !== oldValue) {
        console.log('shouldComponentRender: true')
        return true
      }
    }
    console.log('shouldComponentRender: false')
    return false
  }

  _renderComponent = debounce(function () {
    console.log('renderComponent called')
    if (this.shouldComponentRender(this._propValuesAtLastRender, this._propValues)) {
      console.log('rendering')
      patch(this.shadowRoot, () => {
        this.renderCss()
        this.render()
      })
    }
    this._propValuesAtLastRender = Object.assign({}, this._propValues)
  })

  _defineProperties () {
    const { constructor: Type } = this
    for (const [name, propType] of Type._propTypeRegistry.propTypesByPropName) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: function () {
          return this._propValues[name]
        },
        set: function (value) {
          console.log(`Property ${name} set to ${value}`)
          propType.validate(name, value)
          this._propValues[name] = value
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
