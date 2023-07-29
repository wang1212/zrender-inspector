'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./build/bundle.esm.min.js');
} else {
  module.exports = require('./build/bundle.esm.js');
}
