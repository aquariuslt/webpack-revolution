/* Created by CUIJA on 4/11/17.*/

var path = require('path');

const _root = path.resolve(__dirname, '../..');


function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}


module.exports.root = root;