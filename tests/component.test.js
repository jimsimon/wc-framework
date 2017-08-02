import Testbed from './util/testbed'
import './components/my-test'

describe('Component', function () {
  const testbed = new Testbed()

  it('tests', function () {
    testbed.render(`<my-test required-prop="test" camel-case="hello" a-number="3"></my-test>`)
  })
})
