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
