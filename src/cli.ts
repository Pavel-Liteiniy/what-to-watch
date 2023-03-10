#!/usr/bin/env node

import { CLIApplication } from './app/cli-application.js';

const cli = new CLIApplication();

cli.processCommand(process.argv);
