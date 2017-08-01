import { elementVoid as _elementVoid } from 'incremental-dom';
import { text as _text } from 'incremental-dom';
import { elementClose as _elementClose } from 'incremental-dom';
import { elementOpen as _elementOpen } from 'incremental-dom';
var _hasOwn = Object.prototype.hasOwnProperty;

var _forOwn = function _forOwn(object, iterator) {
  for (var prop in object) if (_hasOwn.call(object, prop)) iterator(object[prop], prop);
};

var _renderArbitrary = function _renderArbitrary(child) {
  var type = typeof child;

  if (type === 'number' || type === 'string' || type === 'object' && child instanceof String) {
    _text(child);
  } else if (Array.isArray(child)) {
    child.forEach(_renderArbitrary);
  } else if (type === 'object') {
    if (child.__jsxDOMWrapper) {
      var func = child.func,
          args = child.args;

      if (args) {
        func.apply(this, args);
      } else {
        func();
      }
    } else if (String(child) === '[object Object]') {
      _forOwn(child, _renderArbitrary);
    }
  }
};

import Component from './component';
import PropTypes from './prop-types';

export default class MyTest extends Component {

  render() {
    _elementOpen('div');

    _elementOpen('button');

    _text('Click me');

    _elementClose('button');

    _elementVoid('slot');

    _renderArbitrary(this.aNumber);

    return _elementClose('div');
  }
}

MyTest.propTypes = {
  camelCase: PropTypes.string(),
  aNumber: PropTypes.number({
    defaultValue: 42
  }),
  requiredProp: PropTypes.string({
    required: true
  })
};
customElements.define('my-test', MyTest);