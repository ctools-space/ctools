// import * as path from 'path';
// import * as fs from 'fs';

// import globby from 'globby';
// import { nativeImage } from 'electron';

// import { isDarwin } from 'common/utils';

// // import { plistReadFile, hash, resolveRoot } from '../index';
// import { FeatureBase, FeatureType } from './index';
// import { hash, plistReadFile } from '../common/index';

// export interface ApplicationFeature extends FeatureBase {
//     type: FeatureType.APPLICATION;
//     path: string;
// }

// // 获取本地应用
// export const searchApplications = async(): Promise<ApplicationFeature[]> => {
//     if (isDarwin) {
//         const applicationPaths = [
//             '/System/Applications',
//             '/Applications',
//             '/System/Library/PreferencePanes',
//         ];

//         const paths = await Promise
//             .all(applicationPaths.map(path => globby(['*.app', '*.prefPane'], {
//                 cwd: path,
//                 onlyFiles: false,
//                 absolute: true,
//             } )))
//             .then(list => list.reduce((l, i) => l.concat(i), []));

//         return Promise.all(paths.map(async p => {
//             const name = path.parse(p).name;
//             const appInfo = await plistReadFile(path.join(p, 'Contents/Info.plist'));

//             const logoPath = appInfo.CFBundleIconFile ?
//                 path.resolve(p, `Contents/Resources/${(appInfo.CFBundleIconFile).replace(/\.icns$/, '')}.icns`) :
//                 path.resolve(p, 'Contents/Resources/AppIcon.icns');
            
//             const logo = fs.existsSync(logoPath) ?
//                 (await nativeImage.createThumbnailFromPath(logoPath, { width: 64, height: 64 })).toDataURL() :
//                 '';

//             return {
//                 // !
//                 type: FeatureType.APPLICATION as FeatureType.APPLICATION,
//                 id: hash(p),
//                 name,
//                 match: [name],
//                 matchField: name,
//                 matchFieldHTML: name,
//                 logo,
//                 path: p,
//             };
//         }));
//     }
//     return [];
// };