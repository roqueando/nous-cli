import {Command, flags} from '@oclif/command'
import {Token} from '@roqueando/nous';
import {createConnection} from 'net';
import chalk from 'chalk';
import boxen from 'boxen';
//@ts-ignore
import ansiAlign = require('ansi-align');
//@ts-ignore
import cfonts = require('cfonts');
import * as fs from 'fs';
import {spawn} from 'child_process';
import * as path from 'path';

export default class DemonterService extends Command {

  static description = 'closes one service'

  static examples = [
    `$ nous demonter Example`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'serviceName',
    }
  ];

  async run() {
    const { args, flags } = this.parse(DemonterService);
    const output = cfonts.render('nous', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });
    const boxer = boxen(
      output.string +
        "\n\n" + chalk.dim.bgBlackBright.magentaBright(`      closing ${args.serviceName}      `),
      {padding: 3}
    );


    const pid = fs.readFileSync(path.resolve(`/tmp/${args.serviceName}.pid`), 'utf8');
    const pids = pid.split('\n');

    this.log(boxer);
    for(let times = 0; times <= pids.length; times++) {
      try {
        return process.kill(parseInt(pids[times]));
      } catch(e) {
        continue;
      }
    }
  }
}
