#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { execSync } from 'child_process';

// Parse the command-line arguments
const argv = yargs(hideBin(process.argv)).argv as any;
const {
  _: [name],
}: any = argv;

// Construct the migration path
const migrationPath = `src/database/migrations/${name}`;

// Run the typeorm command
execSync(`typeorm migration:create ${migrationPath}`, { stdio: 'inherit' });
