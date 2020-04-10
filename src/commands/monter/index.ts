import {Command, flags} from '@oclif/command'
import { Manager, Service } from '@roqueando/nous';
import chalk from 'chalk';
import boxen from 'boxen';
//@ts-ignore
import ansiAlign = require('ansi-align');
//@ts-ignore
import cfonts = require('cfonts');
import * as fs from 'fs';
import {spawn} from 'child_process';
import * as path from 'path';

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

    const output = cfonts.render('nous', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });
    const boxer = boxen(
      output.string +
        "\n\n" + chalk.dim.bgBlackBright.magentaBright("      starting manager and services      "),
      {padding: 3}
    );
    this.log(boxer);
    spawn('node', [path.resolve(__dirname + '../../../upMonter.js')], {
      stdio: 'ignore',
      detached: true
    }).unref();

  }
}
