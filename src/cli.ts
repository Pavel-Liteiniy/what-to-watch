#!/usr/bin/env node

import 'reflect-metadata';

import { CLIApplication } from './app/cli-application.js';

const cli = new CLIApplication();

cli.processCommand(process.argv);
