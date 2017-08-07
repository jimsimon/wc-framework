import { elementOpen, elementClose, text, patch } from 'incremental-dom'
import debounce from 'lodash.debounce'
import humps from 'humps'
import Logger from './logger'

export default class Component extends HTMLElement {
  constructor () {
    super()
    this._logger = new Logger(this.constructor.name)
    this.attachShadow({ mode: 'open' })

    this._propValuesAtLastRender = {}
    this._propValues = {}
    this._defineProperties()
  }

  static get observedAttributes () {
    const results = Object.entries(this.propTypes)
      .reduce(function (accumulator, [name, propType]) {
        const attributeName = humps.decamelize(name, { separator: '-' })
        propType.name = name
        propType.attributeName = attributeName
        accumulator.propTypesByPropName.set(name, propType)
        accumulator.propTypesByAttributeName.set(attributeName, propType)
        accumulator.attributeNames.push(attributeName)
        return accumulator
      }, {
        attributeNames: [],
        propTypesByPropName: new Map(),
        propTypesByAttributeName: new Map()
      })
    this._propTypesByPropName = results.propTypesByPropName
    this._propTypesByAttributeName = results.propTypesByAttributeName
    return results.attributeNames
  }

  attributeChangedCallback (attributeName, oldValue, newValue) {
    const {name, deserialize} = this.constructor._propTypesByAttributeName.get(attributeName)
    this._logger.log(`attribute ${attributeName} changed from ${oldValue} to ${newValue}`)
    this[name] = deserialize(newValue)
  }

  connectedCallback () {
    this._logger.log('connected')
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
        this._logger.log('shouldComponentRender: true')
        return true
      }
    }
    this._logger.log('shouldComponentRender: false')
    return false
  }

  _renderComponent = debounce(function () {
    this._logger.log('renderComponent called')
    if (this.shouldComponentRender(this._propValuesAtLastRender, this._propValues)) {
      this._logger.log('rendering')
      patch(this.shadowRoot, () => {
        this.renderCss()
        this.render()
      })
    }
    this._propValuesAtLastRender = Object.assign({}, this._propValues)
  })

  _defineProperties () {
    const { constructor: Type } = this
    for (const [name, propType] of Type._propTypesByPropName) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: function () {
          return this._propValues[name]
        },
        set: function (value) {
          this._logger.log(`Property ${name} set to ${value}`)
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
