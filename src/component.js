import { elementOpen, elementClose, text, patch } from 'incremental-dom'
import debounce from 'lodash.debounce'
import humps from 'humps'
import ComponentBase from './component-base'
import LoggerMixin from './mixins/logger-mixin'
import HostAttributesMixin from './mixins/host-attributes-mixin'
import ShallowPropertyComparatorMixin from './mixins/shallow-property-comparator-mixin'

export default class Component extends LoggerMixin(HostAttributesMixin(ShallowPropertyComparatorMixin(ComponentBase))) {
  constructor () {
    super()

    this._firstRender = true
    this._propValuesAtLastRender = {}
    this._propValues = {}

    this._defineProperties()
  }

  static get propTypes () {
    return {}
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
    this.log(`attribute ${attributeName} changed from ${oldValue} to ${newValue}`)
    this[name] = deserialize(newValue)
  }

  rerender = debounce(function (slotchangeEvent) {
    this.log('renderComponent called')
    if (this.shouldComponentRender(this._propValuesAtLastRender, this._propValues, slotchangeEvent) || this._firstRender) {
      this.log('rendering')
      patch(this.shadowRoot, () => {
        this.render()
      })
      const slots = this.shadowRoot.querySelectorAll('slot')
      slots.forEach((slot) => {
        slot.addEventListener('slotchange', this.rerender.bind(this))
      })
    }
    this._firstRender = false
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
          this.log(`Property ${name} set to ${value}`)
          propType.validate(name, value)
          this._propValues[name] = value
          this.rerender()
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
