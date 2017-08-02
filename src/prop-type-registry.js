import humps from 'humps'

export default class PropTypeRegistry {
  constructor (propTypes = {}) {
    Object.assign(this, this._buildStores(propTypes))
  }

  _buildStores (propTypes) {
    return Object.entries(propTypes)
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

    // const attributes = Object.entries(propTypes)
    //   .map(function ([name, propType]) {
    //     const attributeName = humps.decamelize(name, { separator: '-' })
    //     propType.name = name
    //     propType.attributeName = attributeName
    //     propTypesByPropName[name] = propType
    //     propTypesByAttributeName[attributeName] = propType
    //     return attributeName
    //   })
    // return attributes
  }
}
