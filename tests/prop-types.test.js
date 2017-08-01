import { number } from '../src/prop-types'

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
    })
  })
})
