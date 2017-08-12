import Testbed from './util/testbed'
import './fixtures/properties-test'
import './fixtures/slot-test'

describe('Component', function () {
  const testbed = new Testbed()

  it('renders a shadow root', function () {
    const element = testbed.render(`<properties-test required-string="test"></properties-test>`)
    expect(element.shadowRoot).to.be.ok
  })

  context('properties', function () {
    let element
    beforeEach(function () {
      element = testbed.render(`<properties-test required-string="test" optional-string="hello" optional-number="3" optional-boolean></properties-test>`)
    })

    it('are set from attributes', function () {
      expect(element.optionalBoolean).to.eq(true)
      expect(element.optionalNumber).to.eq(3)
      expect(element.optionalString).to.eq('hello')
      expect(element.requiredString).to.eq('test')
    })

    it('use the provided default value a when its corresponding attribute is NOT defined', function () {
      const element = testbed.render('<properties-test required-string="test"></properties-test>')

      expect(element.optionalNumber).to.eq(42)
    })

    it('are updated when their corresponding attributes are changed', function () {
      element.removeAttribute('optional-boolean')
      element.setAttribute('optional-number', '4')
      element.setAttribute('optional-string', 'bye')
      element.setAttribute('required-string', 'test2')

      expect(element.optionalBoolean).to.eq(false)
      expect(element.optionalNumber).to.eq(4)
      expect(element.optionalString).to.eq('bye')
      expect(element.requiredString).to.eq('test2')
    })

    it("can be changed via the element's API", function () {
      element.optionalBoolean = false
      element.optionalNumber = 4
      element.optionalString = null
      element.requiredString = 'test2'

      expect(element.optionalBoolean).to.eq(false)
      expect(element.optionalNumber).to.eq(4)
      expect(element.optionalString).to.eq(null)
      expect(element.requiredString).to.eq('test2')
    })

    it('trigger a render when one changes', function () {
      debugger
      const renderSpy = testbed.sandbox.spy(element, 'render')

      debugger
      element.requiredString = 'test2'
      debugger
      testbed.sandbox.clock.tick(0)
      debugger
      expect(renderSpy).to.have.been.calledOnce
    })

    it('only trigger a single render when multiple are changed', function () {
      const renderSpy = testbed.sandbox.spy(element, 'render')

      element.optionalBoolean = false
      element.optionalNumber = 4
      element.optionalString = 'bye'
      element.requiredString = 'test2'

      testbed.sandbox.clock.tick(0)
      expect(renderSpy).to.have.been.calledOnce
    })

    it('do NOT trigger render when one is changed to its current value', function () {
      const renderSpy = testbed.sandbox.spy(element, 'render')

      element.requiredString = 'test'

      testbed.sandbox.clock.tick(0)
      expect(renderSpy).not.to.have.been.called
    })
  })

  context('slots', function () {
    let element
    beforeEach(function () {
      element = testbed.render(`<slot-test>content</slot-test>`)
    })

    it('trigger a render when they are changed', function (done) {
      testbed.sandbox.clock.restore()
      const renderSpy = testbed.sandbox.spy(element, 'render')

      element.innerHTML = 'banana'

      testbed.setTimeout(function (){
        expect(renderSpy).to.have.been.calledOnce
        const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes()
        expect(assignedNodes).to.have.length(1)
        expect(assignedNodes[0].textContent).to.eq('banana')
        done()
      }, 2) // fake timers don't work, so 2 is the lowest value that consistently works for setTimeout :-/
    })
  })
})
