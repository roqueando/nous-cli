import {Command, flags} from '@oclif/command'
import {readdirSync} from 'fs';
import {Service} from '@roqueando/nous';
import * as chalk from 'chalk';
import * as boxen from 'boxen';

export default class MonterService extends Command {

  static description = 'up independent service'

  static examples = [
    `$ nous monterService Example`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'serviceName'}
  ];

  public logService(name: string, port: number) {
    return chalk.bgMagentaBright.dim.blackBright(`      service ${name} up on port:[${port}]    \n\n`);
  }

  async run() {
    const { args } = this.parse(MonterService);
    const files = readdirSync(`${process.cwd()}/services`);
    let servicName = '';
    let servicPort = 0;
    files.forEach(item => {
      const [name] = item.split('.');
      if(args.serviceName === name) {
        const file = require(`${process.cwd()}/services/${item}`);
        const service = new file.default();
        service.setName(name);
        service.run();
        servicName = service.name;
        servicPort = service.port;
      }
    });

    this.log(boxen(this.logService(servicName, servicPort), { padding: 3  }));
  }
}
