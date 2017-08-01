import { number, string } from '../src/prop-types'

describe('Prop type', function () {
  context('number', function () {
    context('validation', function (){
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
  })

  context('string', function () {
    context('validation', function (){
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
  })
})
