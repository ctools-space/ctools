import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';

// import { BrowserWindow } from 'electron';
import globby from 'globby';
import { MainComm } from '@pokemonon/electron-ipc-encapsulation/dist/main';
import { once } from '@pokemonon/knife';
import * as fuzzyjs from 'fuzzyjs';
import { nativeImage } from 'electron';
import execa from 'execa';

import { isDarwin, RecentList } from 'common/utils';

import * as eventTypes from './event-types';
import { plistReadFile, hash, resolveRoot } from '../utils';

export enum FeatureType {
    APPLICATION = 'APPLICATION',
    PLUGIN = 'PLUGINS',
}

export interface FeatureBase {
    // type: FeatureType;
    id: string;
    name: string;
    matchField: string; // 用于匹配搜索的字段
    matchFieldHTML: string; // 高亮
    logo: string;
}
export interface ApplicationFeature extends FeatureBase {
    type: FeatureType.APPLICATION;
    path: string;
}
export interface PluginFeature extends FeatureBase {
    type: FeatureType.PLUGIN;
    cmd: string[];
    code: string;
}
export type FeatureInfo = ApplicationFeature | PluginFeature


export const searchApplications = async(): Promise<ApplicationFeature[]> => {
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
                // !
                type: FeatureType.APPLICATION as FeatureType.APPLICATION,
                id: hash(p),
                name,
                matchField: name,
                matchFieldHTML: name,
                logo,
                path: p,
            };
        }));
    }
    return [];
};

export const features = new RecentList<FeatureInfo>();
export const loadFeatures = async() => {
    const appList = await searchApplications();
    const list = [
        ...appList,
    ];
    features.patch(list);
};
export const searchFeatures = (keyword: string) => {
    const list = features.dump();
    const iter = i => i.matchField;

    const matches = list.sort(fuzzyjs.sort(keyword, { iterator: iter }))
        .filter(fuzzyjs.filter(keyword, { iterator: iter }));
    
    return matches.map(i => {
        const { matchField } = i;
        i.matchFieldHTML = fuzzyjs.surround(matchField, {
            result: fuzzyjs.match(keyword, matchField),
            prefix: '<span class="tw-text-red-500">',
            suffix: '</span>',
        });
        return i;
    });
};


export async function selectedFeature(id: string) {
    const feature = features.find(id);
    // item.type
    if (!feature) return;

    if (feature.type === FeatureType.APPLICATION) {
        await execa('open', [feature.path]);
    }
}


export async function initSource(ipc: MainComm) {
    const { on } = ipc;
    loadFeatures();
    on(eventTypes.SEARCH_FEATURES, async(evt, keyword, resolve) => {
        const features = keyword.trim() ? searchFeatures(keyword) : [];
        resolve(features);
    });

    on(eventTypes.SELECT_FEATURE, async(evt, id: string, resolve) => {
        await selectedFeature(id);
        resolve();
    });    
}
