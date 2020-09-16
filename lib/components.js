'use strict';

import * as components from '../src/components';

module.exports = {
  sayHello,
  ...components,
}

export function sayHello() {
  alert('hello')
}
