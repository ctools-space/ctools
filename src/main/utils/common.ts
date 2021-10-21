import * as path from 'path';

import { app } from 'electron';

/**
 * 从项目的根路径加载
 * @param p 
 * @returns 
 */
export const resolveRoot = (...p: string[]) => path.resolve(app.getAppPath(), '..', ...p);

