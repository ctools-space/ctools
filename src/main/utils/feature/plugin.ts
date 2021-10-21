// import * as path from 'path';
// import * as fs from 'fs';

// import { ENV, isHttp, isProd, Platform } from 'common/utils';
// import { goPluginMain, loadPluginMain } from 'main/browsers';

// import { FeatureBase, FeatureMatch, FeatureType } from './index';
// import { hash } from '../common/index';
// import { features } from '..';
// import { resolveRoot } from '../common';

// /**
//  * 插件plugin.json数据结构
//  */
// export interface PluginConfig {
//     main: string;
//     preload: string;
//     logo: string;
//     platform: Platform[];
//     development: {
//         // 开发模式
//         main: string;
//     };
//     pluginSetting: {
//         single: boolean;
//         height: number;
//     };
//     features: Array<{
//         code: string;
//         explain: string; // 描述
//         icon: string;
//         platform: Platform[];
//         cmds: FeatureMatch[]; // 标题
//     }>
// }

// export enum PluginLabel {
//     builtin = 'builtin',
//     extension = 'extension'
// }
// export enum PluginStatus {
//     prod = 'prod',
//     dev = 'dev'
// }
// export interface PluginFeature extends FeatureBase {
//     type: FeatureType.PLUGIN;
//     label: PluginLabel;
//     status: PluginStatus;
//     cmds: FeatureMatch[];
//     code: string;
//     path: string;
//     explain: string;
//     icon: string;
// }

// /**
//  * 加载插件配置信息
//  * @param pluginPath 
//  * @returns 
//  */
// export function resolvePluginConfig(pluginPath: string): PluginConfig {
//     return require(path.resolve(pluginPath, 'plugin.json'));
// }

// /**
//  * 搜索dir下所有的插件
//  * @param dir 
//  * @returns 
//  */
// export async function searchPlugins(dir: string): Promise<PluginFeature[]> {
//     const pluginNames = fs.readdirSync(dir)
//         .filter(name => fs.existsSync(path.resolve(dir, name, 'plugin.json')));
//     const features: PluginFeature[] = [];
//     for (const pluginName of pluginNames) {
//         const pluginPath = path.resolve(dir, pluginName);
//         const pluginConf = resolvePluginConfig(pluginPath);
//         const {
//             features: pluginFeatures = [],
//             logo,
//         } = pluginConf;
//         for (const pluginFeature of pluginFeatures) {
//             const {
//                 code,
//                 cmds,
//                 explain,
//                 icon,
//             } = pluginFeature;
//             const f = {
//                 type: FeatureType.PLUGIN,
//                 id: hash(pluginPath),
//                 code,
//                 explain,
//                 logo: isHttp(logo) ? logo : path.resolve(dir, pluginName, logo),
//                 icon: isHttp(icon) ? icon : path.resolve(dir, pluginName, icon),
//                 cmds,
//                 path: pluginPath,
//                 match: cmds,
//                 matchFieldHTML: '',
//             } as PluginFeature;
//             features.push(f);
//         }
//     }
//     return features;
// }

// /**
//  * 搜索内置插件
//  * @returns 
//  */
// export async function searchBuiltInPlugins(): Promise<PluginFeature[]> {
//     const builtinPath = resolveRoot('plugins');
//     const builtinPlugins = await searchPlugins(builtinPath);
//     return builtinPlugins.map(i => ({
//         ...i,
//         label: PluginLabel.builtin,
//         status: isProd ? PluginStatus.prod : PluginStatus.dev,
//     }));
// }

// export async function selectPlugin(feature: PluginFeature) {
//     // const { code, path, label } = feature;

//     // let status: PluginStatus = PluginStatus.prod;
//     // if (label === PluginLabel.builtin) {
//     //     status = isProd ? PluginStatus.prod : PluginStatus.dev;
//     // }

//     // goPluginMain(feature);
// }

// /**
//  * 获取功能的信息
//  * @param id 
//  * @returns 
//  */
// export async function getFeatureInfo(id) {
//     const feature = features.find(id) as PluginFeature;
//     if (!feature) return;
//     const pluginConf = resolvePluginConfig(feature.path);
//     const { main, development } = pluginConf;
//     const { status } = feature;

//     const url = status === PluginStatus.prod ? main : development.main;
//     return {
//         url,
//         feature,
//         pluginConf,
//     };
// }