import {Command, flags} from '@oclif/command'
import * as ora from 'ora';
import { ncp } from 'ncp';
import { existsSync, mkdirSync, writeFileSync, readFileSync  } from 'fs';
import cli from 'cli-ux';
import * as inquirer from 'inquirer';
const cfonts = require('cfonts');


export default class Creer extends Command {
  static description = 'create a nous project'

  static examples = [
    `$ nous creer project_name
    `,
  ];

  static flags = {
    help: flags.help({char: 'h'}),
    manager: flags.string({
      options: [
        'yarn',
        'npm'
      ]
    })
  }

  static args = [];

  async run() {
    const {flags} = this.parse(Creer);

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

    const name = await cli.prompt('What is the name of your project');
    const description = await cli.prompt('And the description');
    const author = await cli.prompt('Author');
    const license = await cli.prompt('License');
    const privateProject = await cli.prompt('Private (true or false)');

    let manager = flags.manager;
    if(!manager) {
      let answers: any = await inquirer.prompt([
        {
          name: 'package',
          message: 'Select a package manager',
          type: 'list',
          choices: [
            {
              name: 'yarn',
            },
            {
              name: 'npm'
            }
          ]
        }
      ])
      manager = answers.package;
    }

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
        
        let file = JSON.parse(readFileSync(`${process.cwd()}/${name}/package.json`, 'utf8')); 
        file.name = name;
        file.description = description;
        file.author = author;
        file.license = license;
        file.private = privateProject;

        writeFileSync(`${process.cwd()}/${name}/package.json`, JSON.stringify(file));
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
  }
}
