import {Command, flags} from '@oclif/command'
import {readdirSync} from 'fs';
import {Service} from '@roqueando/nous';
import chalk from 'chalk';
import boxen from 'boxen';
const cfonts = require('cfonts');
import {spawn} from 'child_process';
import * as path from 'path';

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

  async run() {
    const { args } = this.parse(MonterService);

    const output = cfonts.render('nous', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });

    let service = chalk.dim.bgBlackBright.magentaBright(`      starting ${args.serviceName}     `);
    this.log(boxen(output.string + "\n\n" + service, { padding: 3  }));
    spawn('node', [path.resolve(__dirname + '../../../upService.js'), args.serviceName], {
      stdio: 'ignore',
      detached: true
    }).unref();
  }
}
