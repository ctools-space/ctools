import * as path from 'path';
import * as fs from 'fs';

import globby from 'globby';
import { nativeImage } from 'electron';

import { isDarwin } from 'common/utils';
import { plistReadFile } from 'main/utils/common/index';

export interface ApplicationInfo {
    name: string;
    path: string;
    logo: string;
}

// 获取本地应用
export const loadApplications = async(): Promise<ApplicationInfo[]> => {
    if (isDarwin) {
        const applicationPaths = [
            '/System/Applications',
            '/Applications',
            '/System/Library/PreferencePanes',
        ];

        const paths = await Promise
            .all(applicationPaths.map(path => globby(['*.app', '*.prefPane'], {
                cwd: path,
                onlyFiles: false,
                absolute: true,
            } )))
            .then(list => list.reduce((l, i) => l.concat(i), []));

        return Promise.all(paths.map(async p => {
            const name = path.parse(p).name;
            const appInfo = await plistReadFile(path.join(p, 'Contents/Info.plist'));

            const logoPath = appInfo.CFBundleIconFile ?
                path.resolve(p, `Contents/Resources/${(appInfo.CFBundleIconFile).replace(/\.icns$/, '')}.icns`) :
                path.resolve(p, 'Contents/Resources/AppIcon.icns');
            
            const logo = fs.existsSync(logoPath) ?
                (await nativeImage.createThumbnailFromPath(logoPath, { width: 64, height: 64 })).toDataURL() :
                '';

            return {
                name,
                logo,
                path: p,
            };
        }));
    }
    return [];
};