import {Command, flags} from '@oclif/command'
import {createConnection} from 'net';
import chalk from 'chalk';
import boxen from 'boxen';
const Table = require('cli-table');
const cfonts = require('cfonts');

export default class VerifierService extends Command {

  static description = 'display a log of service'

  static examples = [
    `$ nous verifier:service Example`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'serviceName'
    },
    {
      name: 'port'
    },
  ]

  async run() {
    const {args} = this.parse(VerifierService);

    if(!args.serviceName) {
      this.log(chalk.dim.bgRed.blackBright('✖️ error: Must have the name of service'));
      this.exit();
    }
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
        service: args.serviceName
      }
    }));

    client.on('data', payload => {
      const obj = JSON.parse(payload.toString());
      const table = new Table({
        head:[
          chalk.dim.magentaBright('NAME'),
          chalk.dim.magentaBright('PORT'),
          chalk.dim.magentaBright('NODES')
        ],
        colWidths: [15, 14, 10]
      });
      table.push(
        [
          obj.name,
          obj.ports,
          obj.nodes
        ],
      );

      const box = boxen(output.string + "\n\n" + table.toString(), {padding: 3});
      this.log(box);
      process.exit(1);
    });

  }
}
