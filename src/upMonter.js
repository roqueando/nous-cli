const {Manager} = require('@roqueando/nous');
const fs = require('fs');

const manager = new Manager(8080);
manager.run();

const files = fs.readdirSync(`${process.cwd()}/services`);

files.forEach(item => {
  const file = require(`${process.cwd()}/services/${item}`);
  const [className] = item.split('.');
  const service = new file();
  service.setName(className);
  service.run();
});
