// import { assign, isString } from '@pokemonon/knife';
// import * as fuzzyjs from 'fuzzyjs';
// import execa from 'execa';

// import { RecentList } from 'common/utils';

// import { ApplicationFeature, searchApplications } from './application';
// import { PluginFeature, searchBuiltInPlugins, selectPlugin } from './plugin';


// /**
//  * 功能接口定义
//  */
// export enum FeatureType {
//     APPLICATION = 'APPLICATION',
//     PLUGIN = 'PLUGINS',
// }
// export interface FeatureBase {
//     // type: FeatureType;
//     id: string;
//     name: string;
//     match: FeatureMatch[]; // 用于匹配搜索的字段
//     matchField: string;
//     matchFieldHTML: string; // 高亮
//     logo: string;
// }
// export type FeatureInfo = ApplicationFeature | PluginFeature

// export type FeatureMatch = string | {
//     type: 'regex' | 'img' | 'files' | 'window',
//     label: string;x
//     match: string | RegExp;
//     minLength: number;
//     maxLength: number;
// }

// export const features = new RecentList<FeatureInfo>();
// /**
//  * 加载所有可搜索的功能
//  */
// export const loadFeatures = async() => {
//     const appList = await searchApplications();
//     const builtinPlugins = await searchBuiltInPlugins();
//     const list = [
//         ...appList,
//         ...builtinPlugins,
//     ];
//     features.patch(list);
// };

// /**
//  * 根据关键字过滤功能
//  * @param keyword 
//  * @returns 
//  */
// export const searchFeatures = (keyword: string) => {
//     const list = features.dump();
//     const result: FeatureInfo[] = [];
//     for (const item of list) {
//         const { match } = item;
//         for (const m of match) {
//             if (isString(m)) {
//                 const matchResult = fuzzyjs.match(keyword, m);
//                 if (matchResult.match) {
//                     // console.log(m);
//                     assign(item, {
//                         matchField: m,
//                         matchFieldHTML: fuzzyjs.surround(m, {
//                             result: matchResult,
//                             prefix: '<span class="tw-text-red-500">',
//                             suffix: '</span>',
//                         }),
//                     });
//                     // result.push({
//                     //     ...item,
//                     //     matchField: m,
//                     //     matchFieldHTML: fuzzyjs.surround(m, {
//                     //         result: matchResult,
//                     //         prefix: '<span class="tw-text-red-500">',
//                     //         suffix: '</span>',
//                     //     }),
//                     // });
//                     result.push(item);
//                     break;
//                 }
//             } else {
//                 //  
//             }
//         }
//     }

//     return result;
// };

// /**
//  * 使用功能
//  * @param id 
//  * @returns 
//  */
// export async function selectedFeature(id: string) {
//     const feature = features.find(id);
//     // item.type
//     if (!feature) return;

//     if (feature.type === FeatureType.APPLICATION) {
//         await execa('open', [feature.path]);
//         return;
//     }
//     if (feature.type === FeatureType.PLUGIN) {
//         selectPlugin(feature);
//     }
// }