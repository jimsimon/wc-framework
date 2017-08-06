import {boolean, date, number, string} from '../src/prop-types'

describe('Prop type', function () {
  context('number', function () {
    context('validation', function () {
      it('throws an error when the value is an empty string', function () {
        expect(() => number().validate('numberTest', ''))
          .to.throw(Error, 'Expected a number for property numberTest but received string')
      })

      it('throws an error when the value is NaN', function () {
        expect(() => number().validate('numberTest', NaN))
          .to.throw(Error, 'Expected a number for property numberTest but received NaN')
      })

      it('does not throw an error when the value is undefined', function () {
        expect(() => number().validate('numberTest', undefined)).not.to.throw()
      })

      it('does not throw an error when the value is null', function () {
        expect(() => number().validate('numberTest', null)).not.to.throw()
      })

      it('does not throw an error when the value is 0', function () {
        expect(() => number().validate('numberTest', 0)).not.to.throw()
      })

      it('throws an error when a required value is undefined', function () {
        expect(() => number({required: true}).validate('numberTest', undefined)).to.throw(Error, 'Property numberTest is required but was not specified')
      })

      it('throws an error when a required value is null', function () {
        expect(() => number({required: true}).validate('numberTest', null)).to.throw(Error, 'Property numberTest is required but was not specified')
      })

      it('does not throw an error when a required value is 0', function () {
        expect(() => number({required: true}).validate('numberTest', 0)).not.to.throw()
      })
    })

    context('deserialize', function () {
      it('returns undefined when the value is undefined', function () {
        expect(number().deserialize(undefined)).to.be.undefined
      })

      it('returns null when the value is null', function () {
        expect(number().deserialize(null)).to.be.null
      })

      it('returns the correct number when the value is a valid number string', function () {
        expect(number().deserialize('42')).to.eq(42)
      })

      it('returns NaN when the value is not a valid number string', function () {
        expect(number().deserialize('abc123')).to.be.NaN
      })
    })
  })

  context('string', function () {
    context('validation', function () {
      it('throws an error for a non-string value', function () {
        expect(() => string().validate('stringTest', 42))
          .to.throw(Error, 'Expected a string for property stringTest but received number')
      })

      it('does not throw an error when the value is undefined', function () {
        expect(() => string().validate('stringTest', undefined)).not.to.throw()
      })

      it('does not throw an error when the value is null', function () {
        expect(() => string().validate('stringTest', null)).not.to.throw()
      })

      it('throws an error when a required value is undefined', function () {
        expect(() => string({required: true}).validate('stringTest', undefined)).to.throw(Error, 'Property stringTest is required but was not specified')
      })

      it('throws an error when a required value is null', function () {
        expect(() => string({required: true}).validate('stringTest', null)).to.throw(Error, 'Property stringTest is required but was not specified')
      })
    })

    context('deserialize', function () {
      it('returns undefined when the value is undefined', function () {
        expect(string().deserialize(undefined)).to.be.undefined
      })

      it('returns undefined when the value is null', function () {
        expect(string().deserialize(null)).to.be.null
      })

      it('returns the value when the value is a string', function () {
        expect(string().deserialize('42')).to.eq('42')
      })
    })
  })

  context('boolean', function () {
    context('validate', function () {
      it('throws an error for a non-boolean value', function () {
        expect(() => boolean().validate('booleanTest', 42))
          .to.throw(Error, 'Expected a boolean for property booleanTest but received number')
      })

      it('does not throw an error when the value is undefined', function () {
        expect(() => boolean().validate('booleanTest', undefined)).not.to.throw()
      })

      it('does not throw an error when the value is null', function () {
        expect(() => boolean().validate('booleanTest', null)).not.to.throw()
      })

      it('throws an error when a required value is undefined', function () {
        expect(() => boolean({required: true}).validate('booleanTest', undefined)).to.throw(Error, 'Property booleanTest is required but was not specified')
      })

      it('throws an error when a required value is null', function () {
        expect(() => boolean({required: true}).validate('booleanTest', null)).to.throw(Error, 'Property booleanTest is required but was not specified')
      })
    })

    context('deserialize', function () {
      it('returns false when the value is undefined', function () {
        expect(boolean().deserialize(undefined)).to.eq(false)
      })

      it('returns false when the value is null', function () {
        expect(boolean().deserialize(null)).to.eq(false)
      })

      it('returns the true when the value is defined', function () {
        expect(boolean().deserialize('42')).to.eq(true)
      })
    })
  })

  context('date', function () {
    context('validate', function () {
      it('throws an error for a non-date value', function () {
        expect(() => date().validate('dateTest', 42))
          .to.throw(Error, 'Expected a date for property dateTest but received number')
      })

      it('does not throw an error when the value is undefined', function () {
        expect(() => date().validate('dateTest', undefined)).not.to.throw()
      })

      it('does not throw an error when the value is null', function () {
        expect(() => date().validate('dateTest', null)).not.to.throw()
      })

      it('throws an error when a required value is undefined', function () {
        expect(() => date({required: true}).validate('dateTest', undefined)).to.throw(Error, 'Property dateTest is required but was not specified')
      })

      it('throws an error when a required value is null', function () {
        expect(() => date({required: true}).validate('dateTest', null)).to.throw(Error, 'Property dateTest is required but was not specified')
      })
    })

    context('deserialize', function () {
      it('returns undefined when the value is undefined', function () {
        expect(date().deserialize(undefined)).to.be.undefined
      })

      it('returns undefined when the value is null', function () {
        expect(date().deserialize(null)).to.be.null
      })

      it('returns the correct date object when the value is a valid date string', function () {
        const expectedDate = new Date('2017-08-06T05:28:12.347Z')
        expect(date().deserialize('2017-08-06T05:28:12.347Z')).to.eql(expectedDate)
      })
    })
  })
})
