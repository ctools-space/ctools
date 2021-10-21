/**
 * node端通用
 */
import * as path from 'path';
import * as util from 'util';
import * as cryto from 'crypto';

import { readFile } from 'simple-plist';

import { isHttp } from 'common/utils';

export const plistReadFile = util.promisify(readFile);

/**
 * hash
 * @param str 
 * @returns 
 */
export const hash = (str: string) => {
    const hash = cryto.createHash('sha256');
    return hash.update(str).digest('hex');
};

export function normalURI(str: string, basePath: string) {
    if (!str) return '';
    return isHttp(str) ? str : path.resolve(basePath, str);
}