class PropType {
  constructor ({required, defaultValue} = {}) {
    this.required = required
    this.defaultValue = defaultValue
  }

  validate (name, value) {
    if (this.required && (value === undefined || value === null)) {
      throw new Error(`Property ${name} is required but was not specified`)
    }
  }
}

class NumberType extends PropType {
  validate (name, value) {
    super.validate(name, value)

    if (value !== undefined && value !== null) {
      if (typeof value !== 'number') {
        throw new Error(`Expected a number for property ${name} but received ${typeof value}`)
      }
      if (isNaN(value)) {
        throw new Error(`Expected a number for property ${name} but received NaN`)
      }
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

export const number = (config) => new NumberType(config)
export const string = (config) => new StringType(config)

export default {
  number,
  string
}
