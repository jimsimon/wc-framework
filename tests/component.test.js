import Testbed from './util/testbed'
import './components/my-test'

describe('Component', function () {
  const testbed = new Testbed()

  let element
  beforeEach(function () {
    element = testbed.render(`<my-test required-string="test" optional-string="hello" optional-number="3"></my-test>`)
  })

  it('renders a shadow root', function () {
    expect(element.shadowRoot).to.be.ok
  })

  it('sets properties from attributes', function () {
    expect(element.requiredString).to.eql('test')
    expect(element.optionalString).to.eql('hello')
    expect(element.optionalNumber).to.eql(3)
  })
})
