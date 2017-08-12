import humps from 'humps'

export default (superclass) => class PropertiesMixin extends superclass {
  static get propTypes () {
    return {}
  }

  static get propTypeDetails () {
    if (!this._propTypeDetails) {
      this._propTypeDetails = Object.entries(this.propTypes)
        .reduce(function (accumulator, [name, propType]) {
          const attributeName = humps.decamelize(name, {separator: '-'})
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
    }
    return this._propTypeDetails
  }

  static get attributeNames () {
    return this.propTypeDetails.attributeNames
  }

  static get propTypesByPropName () {
    return this.propTypeDetails.propTypesByPropName
  }

  static get propTypesByAttributeName () {
    return this.propTypeDetails.propTypesByAttributeName
  }
}
