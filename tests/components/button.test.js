import '../../src/components/wc-button/index'
import Testbed from '../util/testbed'

describe('wc-button', function () {
  const testbed = new Testbed()
  const children = 'Button Text'

  let element
  beforeEach(function () {
    element = testbed.render(`<wc-button>${children}</wc-button>`)
  })



  it('renders child content inside the button', function () {
    const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes()
    expect(assignedNodes).to.have.length(1)
    expect(assignedNodes[0].textContent).to.eq(children)
  })

  it('triggers an click event when clicked', function (done) {
    element.addEventListener('click', function (event) {
      expect(event).to.be.ok
      done()
    })
    element.click()
  })

  it('triggers a click event when focused and space is pressed', function (done) {
    element.addEventListener('click', function (event) {
      expect(event).to.be.ok
      done()
    })
    element.dispatchEvent(new KeyboardEvent('keydown',{'key':' '}))
  })

  it('triggers a click event when focused and enter is pressed', function (done) {
    element.addEventListener('click', function (event) {
      expect(event).to.be.ok
      done()
    })
    element.dispatchEvent(new KeyboardEvent('keydown',{'key':'Enter'}))
  })
})
