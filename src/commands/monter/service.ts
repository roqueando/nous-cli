import {Command, flags} from '@oclif/command'
import {readdirSync} from 'fs';
import {Service} from '@roqueando/nous';
import chalk from 'chalk';
import boxen from 'boxen';
const cfonts = require('cfonts');

export default class MonterService extends Command {

  static description = 'Up independent service'

  static examples = [
    `$ nous monter:service Example`,
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

    const output = cfonts.render('noeuds', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });

    files.forEach(item => {
      const [name] = item.split('.');
      if(args.serviceName === name) {
        const file = require(`${process.cwd()}/services/${item}`);
        const service = new file;
        service.setName(name);
        service.run();
        servicName = service.name;
        servicPort = service.port;
      }
    });

    this.log(boxen(output.string + "\n\n" + this.logService(servicName, servicPort), { padding: 3  }));
  }
}
