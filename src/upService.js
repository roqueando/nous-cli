const fs = require('fs');
const files = fs.readdirSync(`${process.cwd()}/services`);

const serviceName = process.argv[2];

files.forEach(item => {
  const [name] = item.split('.');
  if(serviceName === name) {
    const file = require(`${process.cwd()}/services/${item}`);
    const service = new file;
    service.setName(name);
    service.run();
  }
});
