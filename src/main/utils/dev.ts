import * as path from 'path';
import * as fs from 'fs';

import { app, session } from 'electron';

import { isProd } from 'common/utils';
import { openDevTools } from 'main/browsers';

const fsPromises = fs.promises;

// macos
export async function findLocalExtension(name: string) {
    const extensionsPath = path.resolve(app.getPath('home'), 'Library/Application Support/Google/Chrome/Default/Extensions');
    const extensions = await fsPromises.readdir(extensionsPath);
    for (const extension of extensions) {
        const extensionPath = path.resolve(extensionsPath, extension);
        const versions = await fsPromises.readdir(extensionPath);
        for (const version of versions) {
            const manifest = require(path.resolve(extensionPath, version, 'manifest.json'));
            const { name: extensionName } = manifest;
            if (extensionName === name) {
                return path.resolve(extensionPath, version);
            }
        }
    }
    return '';
}

export async function initDev() {
    if (!isProd) {
        const vueDevtoolsPath = await findLocalExtension('Vue.js devtools');
        vueDevtoolsPath && session.defaultSession.loadExtension(vueDevtoolsPath);

        openDevTools();
    }
}