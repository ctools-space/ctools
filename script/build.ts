import { spawn, ChildProcess } from 'child_process';

import { watch, rollup } from 'rollup';
import minimist from 'minimist';
import chalk from 'chalk';
import ora from 'ora';
import waitOn from 'wait-on';
import electron from 'electron';
import { sureArray } from '@pokemonon/knife';
import { logger, Spinner } from '@pokemonon/knife/node';

import options from './rollup.config';
import { main } from '../package.json';
import { getEnv } from './config/env';
import { ENV } from '../src/common/utils';
import { resolve } from './utils/helpers';

const userEnv = getEnv();
const buildEnv = userEnv.NODE_ENV as ENV;

const argv = minimist(process.argv.slice(2));
const opt = options(buildEnv);

const spinner = new Spinner('Electron build');

async function start() {
    if (argv.watch) {
        waitOn({
            resources: [`http://localhost:${process.env.PORT}/index.html`],
            log: false,
        }, err => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
    
            const watcher = watch(opt);
            let child: ChildProcess;
            watcher.on('change', filename => {
                const log = chalk.green(`change -- ${filename}`);
                console.log(log);
            });
            watcher.on('event', ev => {
                if (ev.code === 'END') {
                    if (child) child.kill();
                    child = spawn(electron as any, [resolve(main)], { stdio: 'inherit' });
                } else if (ev.code === 'ERROR') {
                    console.log(ev.error);
                }
            });
        });
    } else {
        spinner.start();
        try {
            for (const conf of opt) {
                const build = await rollup(conf);
                sureArray(conf.output!).forEach(build.write);
            }
            spinner.success();
        } catch (error) {
            spinner.fail('构建报错');
        }
    }
}

start();
