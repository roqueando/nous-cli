# nous-cli

## Une interface en ligne de commande pour nous

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nous-cli.svg)](https://npmjs.org/package/nous-cli)
[![Downloads/week](https://img.shields.io/npm/dw/nous-cli.svg)](https://npmjs.org/package/nous-cli)
[![License](https://img.shields.io/npm/l/nous-cli.svg)](https://github.com/roqueando/nous-cli/blob/master/package.json)

<!-- toc -->
* [nous-cli](#nous-cli)
* [Usage](#usage)
* [Commands](#commands)
* [nous-cli](#nous-cli-1)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nous-cli
$ nous COMMAND
running command...
$ nous (-v|--version|version)
nous-cli/0.1.4 linux-x64 node-v10.19.0
$ nous --help [COMMAND]
USAGE
  $ nous COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nous creer`](#nous-creer)
* [`nous help [COMMAND]`](#nous-help-command)

## `nous creer`

create a nous project

```
USAGE
  $ nous creer

OPTIONS
  -h, --help          show CLI help
  --manager=yarn|npm

EXAMPLE
  $ nous creer project_name
```

_See code: [src/commands/creer.ts](https://github.com/roqueando/nous-cli/blob/v0.1.4/src/commands/creer.ts)_

## `nous help [COMMAND]`

display help for nous

```
USAGE
  $ nous help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
=======
# nous-cli
>>>>>>> 79f13dbaf2757a9815eaa62aee617a184c3c127d