import axe from 'axe-core'

export default class Testbed {
  constructor () {
    this.setTimeout = setTimeout.bind(window)
    this.containers = []

    beforeEach(this.beforeEach.bind(this))
    afterEach(this.afterEach.bind(this))
  }

  beforeEach () {
    this.sandbox = sinon.sandbox.create(sinon.defaultConfig)
  }

  afterEach () {
    this.containers.forEach(function (container) {
      container.remove()
    })
    this.sandbox.restore()
  }

  render (fixture) {
    const container = document.createElement('div')
    container.innerHTML = fixture
    this.containers.push(container)
    document.body.appendChild(container)
    this.sandbox.clock.tick(0) // due to sinon's fake timers we need to tick to make the component render
    return container.firstChild
  }
}
const Assertion = global.chai.Assertion
global.chai.use(function (chai, utils) {
  utils.addMethod(Assertion.prototype, 'accessible', function (done) {
    const obj = utils.flag(this, 'object')
    axe.run(obj).then(function (results) {
      if (results.violations.length) {
        let reason = 'One or more accessibility issues were found\n'
        results.violations.forEach(function ({id, help}) {
          reason += `${id}: ${help}\n`
        })
        done(new Error(reason))
      } else {
        done()
      }
    }).catch(function () {
      console.log('catching')
    })
  })
})
