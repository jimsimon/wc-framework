class PropType {
  constructor ({required, defaultValue} = {}) {
    this.required = required
    this.defaultValue = defaultValue
  }

  validate (name, value) {
    if (this.required && !value) {
      throw new Error(`Property ${name} is required but was not specified`)
    }
  }
}

class NumberType extends PropType {
  validate (name, potentialNumber) {
    super.validate(name, potentialNumber)

    if (potentialNumber !== undefined && potentialNumber !== null && typeof potentialNumber !== 'number') {
      throw new Error(`Expected a number for property ${name} but received ${typeof potentialNumber}`)
    }
  }

  deserialize (value) {
    return parseInt(value, 10)
  }
}

class StringType extends PropType {
  validate (name, potentialString) {
    super.validate(name, potentialString)

    if (potentialString !== undefined && potentialString !== null && typeof potentialString !== 'string') {
      throw new Error(`Expected a string for property ${name} but received ${typeof potentialString}`)
    }
  }

  deserialize (value) {
    return value
  }
}

export default {
  number: (config) => new NumberType(config),
  string: (config) => new StringType(config)
}
