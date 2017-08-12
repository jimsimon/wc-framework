import '../../src/components/wc-button/index'
import Testbed from '../util/testbed'

describe('wc-button', function () {
  const testbed = new Testbed()

  it('renders child content inside the button', function () {
    const children = 'Button Text'
    const element = testbed.render(`<wc-button raised="banana">${children}</wc-button>`)
    const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes()
    expect(assignedNodes).to.have.length(1)
    expect(assignedNodes[0].textContent).to.eq(children)
  })

  it('triggers an click event when clicked', function (done) {
    const element = testbed.render('<wc-button raised="bs"></wc-button>')
    element.addEventListener('click', function (event) {
      expect(event).to.be.ok
      done()
    })
    element.shadowRoot.firstChild.click()
  })
})
