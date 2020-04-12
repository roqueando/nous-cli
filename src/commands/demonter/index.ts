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

export default class Demonter extends Command {

  static description = 'closes all services and the manager'

  static examples = [
    `$ nous demonter 8080 KEY`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'port',
    },
    {
      name: 'key'
    }
  ];

  async run() {
    const { args, flags } = this.parse(Demonter);
    const client = createConnection({ port: args.port ? args.port : 8080  });

    const token = new Token(args.key ? args.key : null);
    client.write(JSON.stringify({
      action: 'down',
      payload: {
        from: token.getToken(),
      }
    }));
    const output = cfonts.render('nous', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });
    const boxer = boxen(
      output.string +
        "\n\n" + chalk.dim.bgBlackBright.magentaBright("      closing manager and services      "),
      {padding: 3}
    );

    client.on('data', payload => {
      if(payload.toString() === 'OK') {
        const pid = fs.readFileSync(path.resolve('/tmp/main.pid'), 'utf8');
        process.kill(parseInt(pid), 'SIGTERM');
      }
    });
    this.log(boxer);
  }
}
