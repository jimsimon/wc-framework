import './components/my-test'
import Testbed from './util/testbed'

describe('testing', function () {
  const testbed = new Testbed()

  it('works', function () {
    testbed.render('<my-test requiredProp="valid"></my-test>')
  })
})
