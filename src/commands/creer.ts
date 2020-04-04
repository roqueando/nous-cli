import {Command, flags} from '@oclif/command'
import * as ora from 'ora';
import { ncp } from 'ncp';
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync  } from 'fs';
import * as path from 'path';
import cli from 'cli-ux';
import * as inquirer from 'inquirer';
//@ts-ignore
import cfonts = require('cfonts');
//@ts-ignore
//@ts-nocheck
import { projectInstall } from 'pkg-install';
import * as chalk from 'chalk';

export default class Creer extends Command {
  static description = 'create a nous project'

  static examples = [
    `$ nous creer
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

    const name = await cli.prompt(chalk.cyanBright.dim('what is the name of your project'));
    const description = await cli.prompt(chalk.cyanBright.dim('and the description'));
    const author = await cli.prompt(chalk.cyanBright.dim('author'));
    const license = await cli.prompt(chalk.cyanBright.dim('license'));
    const privateProject = await inquirer.prompt([
      {
        name: 'private',
        message: 'privacy',
        type: 'list',
        choices: [
          {
            name: 'true',
          },
          {
            name: 'false'
          }
        ]
      }
    ]);

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
      spinner.text = chalk.magentaBright.dim.bgGrey("création d'un dossier \n");
      mkdirSync(`${process.cwd()}/${name}`);

      ncp(path.resolve(__dirname, '../squelette'), `${process.cwd()}/${name}`, async (err: any) => {
        if (err) {
          spinner.text = chalk.bgRed.dim.blackBright("pardon, some error occurs");
          spinner.fail();
          spinner.stop();
          this.error(err.toString());
        }

        spinner.text = chalk.magentaBright.dim.bgGrey("dossier créé\n\n");
      });
      
      if(existsSync(`${process.cwd()}/${name}/package.json`)) {
        let file = JSON.parse(readFileSync(`${process.cwd()}/${name}/package.json`, 'utf8'));
        file.name = name;
        file.description = description;
        file.author = author;
        file.license = license;
        file.private = privateProject.private === 'true' ? true : false;

        writeFileSync(`${process.cwd()}/${name}/package.json`, JSON.stringify(file, null, 2));
      }

      //@ts-ignore
      const {stdout} = await projectInstall({ prefer: manager, cwd: `${process.cwd()}/${name}`});

      this.log(stdout);
      spinner.text = chalk.bgGreenBright.dim.blackBright("terminé! 😄");
      spinner.succeed();
      spinner.stop();
    } else {
      spinner.text = chalk.bgRed.dim.blackBright("pardon, that folder already exists");
      spinner.fail();
      spinner.stop();
    }
  }
}
