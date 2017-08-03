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
    expect(element.requiredString).to.eq('test')
    expect(element.optionalString).to.eq('hello')
    expect(element.optionalNumber).to.eq(3)
  })

  it('uses the default value a property has one and its corresponding attribute is NOT defined', function () {
    const element = testbed.render('<my-test required-string="test"></my-test>')

    expect(element.optionalNumber).to.eq(42)
  })

  it('updates properties when their corresponding attributes are changed', function () {
    element.setAttribute('required-string', 'test2')
    element.setAttribute('optional-string', 'bye')
    element.setAttribute('optional-number', '4')

    expect(element.requiredString).to.eq('test2')
    expect(element.optionalString).to.eq('bye')
    expect(element.optionalNumber).to.eq(4)
  })

  it("allows changing properties via the element's API", function () {
    element.requiredString = 'test2'
    element.optionalString = null
    element.optionalNumber = 4

    expect(element.requiredString).to.eq('test2')
    expect(element.optionalString).to.eq(null)
    expect(element.optionalNumber).to.eq(4)
  })

  it('calls render when a property changes', function () {
    const renderSpy = testbed.sandbox.spy(element, 'render')

    element.requiredString = 'test2'
    testbed.sandbox.clock.tick(0)
    expect(renderSpy).to.have.been.calledOnce
  })

  it('only calls render once when multiple properties are changed', function () {
    const renderSpy = testbed.sandbox.spy(element, 'render')

    element.requiredString = 'test2'
    element.optionalString = 'bye'
    element.optionalNumber = 4

    testbed.sandbox.clock.tick(0)
    expect(renderSpy).to.have.been.calledOnce
  })

  it('does NOT call render when a property is set to its current value', function () {
    const renderSpy = testbed.sandbox.spy(element, 'render')

    element.requiredString = 'test'

    testbed.sandbox.clock.tick(0)
    expect(renderSpy).not.to.have.been.called
  })
})
