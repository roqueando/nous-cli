import {Command, flags} from '@oclif/command'
import {createConnection} from 'net';
import chalk from 'chalk';
import boxen from 'boxen';
const Table = require('cli-table');
const cfonts = require('cfonts');

export default class Verifier extends Command {

  static description = 'display a log of manager and services'

  static examples = [
    `$ nous verifier`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'port'
    }
  ]

  async run() {
    const {args} = this.parse(Verifier);

    const output = cfonts.render('nous', {
      colors: ['white'],
      gradient: ["#DAE2F8", "#D6A4A4"],
      space: false,
    });
    const client = createConnection({port: args.port ? args.port : 8080});
    client.write(JSON.stringify({
      isService: false,
      action: 'log',
      payload: {
        service: null
      }
    }));

    client.on('data', payload => {
      const obj = JSON.parse(payload.toString());
      console.log(obj.services[0]);
      const table = new Table({
        head:[
          chalk.dim.magentaBright('ID'),
          chalk.dim.magentaBright('NAME'),
          chalk.dim.magentaBright('PORT'),
          chalk.dim.magentaBright('ADDR')
        ],
        colWidths: [15, 10, 10, 10]
      });
      const services = obj.services.map((item: any) => {
        return [
          item.id,
          item.name,
          item.port,
        ]
      });
      table.push(
        [
          obj.manager.id,
          obj.manager.name,
          obj.manager.port,
          obj.manager.host.address
        ],
        ...services
      );
      const box = boxen(output.string + "\n\n" + table.toString(), {padding: 3});
      this.log(box);
      process.exit(1);
    });

  }
}
