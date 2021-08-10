import * as path from 'path';

/**
 * 相对项目根目录 执行环境是根路径
 * @param p 
 * @returns 
 */
export const resolve = (...p: string[]) => {
    return path.resolve(process.cwd(), ...p);
};
