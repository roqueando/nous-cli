const {Service} = require('@roqueando/nous');

class Example extends Service {
   hello(name) {
    return `Hello: ${name}`;
  }
}

module.exports = Example;
