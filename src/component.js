import { patch, attributes } from 'incremental-dom'
import debounce from 'lodash.debounce'
import ComponentBase from './component-base'
import LoggerMixin from './mixins/logger-mixin'
import HostAttributesMixin from './mixins/host-attributes-mixin'
import ShallowPropertyComparatorMixin from './mixins/shallow-property-comparator-mixin'
import PropertiesMixin from './mixins/properties-mixin'

attributes.dangerouslySetInnerHTML = function(el, property, value) {
  if (el.innerHTML !== value) {
    el.innerHTML = value
  }
}

export default class Component extends LoggerMixin(HostAttributesMixin(ShallowPropertyComparatorMixin(PropertiesMixin(ComponentBase)))) {
  constructor () {
    super()

    this._firstRender = true
    this._propValuesAtLastRender = {}
    this._propValues = {}

    this._defineProperties()
  }

  static get observedAttributes () {
    return this.attributeNames
  }

  attributeChangedCallback (attributeName, oldValue, newValue) {
    const {name, deserialize} = this.constructor.propTypesByAttributeName.get(attributeName)
    this.log(`attribute ${attributeName} changed from ${oldValue} to ${newValue}`)
    this[name] = deserialize(newValue)
  }

  rerender = debounce(function (slotchangeEvent) {
    this.log('renderComponent called')
    if (this.shouldComponentRender(this._propValuesAtLastRender, this._propValues, slotchangeEvent) || this._firstRender) {
      this.log('rendering')
      patch(this.shadowRoot, () => {
        this.renderCss()
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
    for (const [name, propType] of Type.propTypesByPropName) {
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
