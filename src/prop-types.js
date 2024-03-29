class PropType {
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
    if (value === undefined || value === null) {
      return value
    }
    return parseInt(value, 10)
  }
}

class StringType extends PropType {
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

class BooleanType extends PropType {
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

class DateType extends PropType {
  validate (name, value) {
    super.validate(name, value)

    if (value !== undefined && value !== null && typeof !(value instanceof Date)) {
      throw new Error(`Expected a date for property ${name} but received ${typeof value}`)
    }
  }

  deserialize (value) {
    if (value === undefined || value === null) {
      return value
    }
    return new Date(value)
  }
}

class ObjectType extends PropType {
  validate (name, value) {
    super.validate(name, value)

    if (value !== undefined && value !== null && value !== Object(value)) {
      throw new Error(`Expected an object for property ${name} but received ${typeof value}`)
    }
  }

  deserialize (value) {
    if (value === undefined || value === null) {
      return value
    }
    return JSON.parse(value)
  }
}

class ArrayType extends PropType {
  validate (name, value) {
    super.validate(name, value)

    if (value !== undefined && value !== null && !Array.isArray(value)) {
      throw new Error(`Expected an array for property ${name} but received ${typeof value}`)
    }
  }

  deserialize (value) {
    if (value === undefined || value === null) {
      return value
    }
    return JSON.parse(value)
  }
}

export const array = (config) => new ArrayType(config)
export const boolean = (config) => new BooleanType(config)
export const date = (config) => new DateType(config)
export const number = (config) => new NumberType(config)
export const object = (config) => new ObjectType(config)
export const string = (config) => new StringType(config)

export default {
  array,
  boolean,
  date,
  number,
  object,
  string
}
