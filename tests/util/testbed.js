export default class Testbed {
  constructor () {
    this.container = null

    beforeEach(this.beforeEach.bind(this))
    afterEach(this.afterEach.bind(this))
  }

  beforeEach () {
    this.container = document.createElement('div')
  }

  afterEach () {
    this.container.remove()
  }

  render (fixture) {
    this.container.innerHTML = fixture
    return this.container.firstChild
  }
}
