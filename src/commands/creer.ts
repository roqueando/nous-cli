import {Command, flags} from '@oclif/command'
import * as ora from 'ora';
import { ncp } from 'ncp';
import { existsSync, mkdirSync  } from 'fs';
const cfonts = require('cfonts');


export default class Creer extends Command {
  static description = 'create a nous project'

  static examples = [
    `$ nous creer project_name
`,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'Project name'}),
  }

  static args = [{name: 'file'}];

  async run() {
    const output = cfonts.render('nous', {
        colors: ['white'],
        gradient: ["#DAE2F8", "#D6A4A4"],
        space: false
    });

    const subtitle = cfonts.render('Un orchestre parmi nous', {
        font: 'tiny',
        colors: ['#B06AB3'],
        gradient: ["#636FA4", "#E8CBC0"],
        independentGradient: true
    });

    this.log(output.string);
    this.log(subtitle.string);
    const {flags} = this.parse(Creer)

    const name = flags.name || 'nous-squelette'
    const spinner = ora(`création de projet ${name}`).start();
    
    if(!existsSync(`${process.cwd()}/${name}`)) {
        spinner.text = "création d'un dossier";
        mkdirSync(`${process.cwd()}/${name}`);
        ncp("./src/squelette", `${process.cwd()}/${name}`, err => {
            if (err) {
                spinner.text = "pardon, some error occurs";
                spinner.fail();
                spinner.stop();
                return;
            }
            spinner.text = "projet créé avec succès ✔️";
            spinner.succeed();
            spinner.stop();
            return;
        });

    } else {
        spinner.text = "pardon, that folder already exists";
        spinner.fail();
        spinner.stop();
    }
    //ncp("../squelette", process.cwd(), err => {
    //    if(err) throw err;
    //    spinner.text = "projet créé avec succès ✔️";
    //});
  }
}
