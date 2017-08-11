import '../../src/components/wc-button/wc-button'
import Testbed from '../util/testbed'

describe('wc-button', function () {
  const testbed = new Testbed()

  it('renders a button', function () {
    const element = testbed.render('<wc-button></wc-button>')
    expect(element.shadowRoot.children[1].tagName).to.eq('BUTTON')
  })

  it('renders child content inside the button', function () {
    const children = 'Button Text'
    const element = testbed.render(`<wc-button>${children}</wc-button>`)
    const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes()
    expect(assignedNodes).to.have.length(1)
    expect(assignedNodes[0].textContent).to.eq(children)
  })

  it('triggers an click event when clicked', function (done) {
    const element = testbed.render('<wc-button></wc-button>')
    element.addEventListener('click', function (event) {
      expect(event).to.be.ok
      done()
    })
    element.shadowRoot.children[1].click()
  })
})
