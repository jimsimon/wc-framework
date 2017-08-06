export class PropType {
  constructor ({required, defaultValue} = {}) {
    this.required = required
    this.defaultValue = defaultValue
    this.name = null
    this.attributeName = null
  }

  validate (name, value) {
    if (this.required && (value === undefined || value === null)) {
      throw new Error(`Property ${name} is required but was not specified`)
    }
  }
}

export class NumberType extends PropType {
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
    if (value === undefined || value === null) {
      return value
    }
    return parseInt(value, 10)
  }
}

export class StringType extends PropType {
  validate (name, value) {
    super.validate(name, value)

    if (value !== undefined && value !== null && typeof value !== 'string') {
      throw new Error(`Expected a string for property ${name} but received ${typeof value}`)
    }
  }

  deserialize (value) {
    return value
  }
}

export class BooleanType extends PropType {
  validate (name, value) {
    super.validate(name, value)

    if (value !== undefined && value !== null && typeof value !== 'boolean') {
      throw new Error(`Expected a boolean for property ${name} but received ${typeof value}`)
    }
  }

  deserialize (value) {
    return value !== null && value !== undefined
  }
}

export const boolean = (config) => new BooleanType(config)
export const number = (config) => new NumberType(config)
export const string = (config) => new StringType(config)

export default {
  boolean,
  number,
  string
}
