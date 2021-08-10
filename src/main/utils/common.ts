import * as path from 'path';
import * as util from 'util';
import { createHash } from 'crypto';

import { readFile } from 'simple-plist';

export const resolveRoot = (...p) => path.resolve(__dirname, '..', ...p);
export const plistReadFile = util.promisify(readFile);
export const hash = (str: string) => {
    const hash = createHash('sha256');
    return hash.update(str).digest('hex');
};