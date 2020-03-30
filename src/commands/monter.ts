import {Command, flags} from '@oclif/command'
import { Messenger, Manager, Service } from '@roqueando/nous';
import * as chalk from 'chalk';
import * as boxen from 'boxen';
//@ts-ignore
import ansiAlign = require('ansi-align');
//@ts-ignore
import cfonts = require('cfonts');
import * as fs from 'fs';

export default class Monter extends Command {

  static description = 'up manager and all services'

  static examples = [
    `$ nous monter 8080`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'port'
    }
  ];

  public logManager(port: number) {
    return chalk.bgMagentaBright.dim.blackBright(`      Running Manager on port:[${port}]    \n\n`);
  }

  public logServices(services: Array<Service>): string {
    let string = "";
    services.forEach((item: any) => {
      string += chalk.bgCyanBright.blackBright.dim(` service up ${item.name} port:[${item.port}]  `) + "\n\n";
    });

    return string;
  }

  async run() {
    const { args } = this.parse(Monter);
    const manager = new Manager(args.port ? args.port : 8080);
    const output = cfonts.render('nous', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });

    manager.run();
    manager.upServicesListener();

    let services: Array<Service> = [];
    const files = fs.readdirSync(`${process.cwd()}/services`);

    files.forEach((item: string) => {
      const file = require(`${process.cwd()}/services/${item}`);
      const [className] = item.split('.');
      const service: Service = new file.default();
      service.setName(className);
      service.run();
      services.push(service);
    });
    const boxer = boxen(
      output.string +
        "\n\n" + this.logManager(args.port ? args.port : 8080) +
        this.logServices(services),
      {padding: 3}
    );
    this.log(boxer);
    console.log(Messenger.getInstance());
  }
}
