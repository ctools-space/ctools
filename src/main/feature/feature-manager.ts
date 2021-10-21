import { isString, assign } from '@pokemonon/knife';
import * as fuzzyjs from 'fuzzyjs';
import execa from 'execa';

import { PluginManager } from 'main/plugin/main';
import { ApplicationFeature, ApplicationManager } from 'main/application';
import { PluginFeature } from 'main/plugin/common/config';

import { MatchType } from './types';

/**
 * 功能接口定义
 */
export enum FeatureType {
    APPLICATION = 'APPLICATION',
    PLUGIN = 'PLUGINS',
}
export interface FeatureMatchConfig {
    type: MatchType;
    label: string;
    match?: string | RegExp;
    minLength?: number;
    maxLength?: number;
}
export type FeatureMatch = string | FeatureMatchConfig;
export interface FeatureBase {
    type: FeatureType;
    id: string;
    name: string;
    logo: string;
    path: string;

    matches: FeatureMatch[]; // 用于匹配搜索的字段
    matchField: string;
    matchFieldHTML: string; // 高亮
}
export type FeatureInfo = ApplicationFeature | PluginFeature

export interface MatchInfo {
    type: MatchType;
    payload: any;
}
/**
 * todo optimize
 */
export class FeatureManager {
    list!: FeatureInfo[]
    #applicationManager = new ApplicationManager()
    #pluginManager = new PluginManager()

    async init() {
        await this.reload();
    }

    async reload() {
        await Promise.all([this.#applicationManager.init(), this.#pluginManager.init()]);
        this.list = [
            ...this.#applicationManager.features,
            ...this.#pluginManager.features,
        ];
    }

    /**
     * 搜索功能
     * @param matchInfo 
     * @returns 
     */
    find(matchInfo: MatchInfo) {
        const { type, payload } = matchInfo;
        if (!payload) return [];

        const result: FeatureInfo[] = [];

        for (const item of this.list) {
            const feature = this.matchFeature(item, matchInfo);
            if (feature) {
                result.push(feature);
            }
        }

        if (type === MatchType.command) {
            return result.sort(fuzzyjs.sort(payload, { iterator: i => i.matchField.label }));
        }

        return result;
    }

    matchFeature(feature: FeatureInfo, matchInfo: MatchInfo) {
        const { type, payload } = matchInfo;
        const { matches } = feature;
        for (let m of matches) {
            if (isString(m)) {
                m = {
                    type: MatchType.command,
                    label: m,
                };
            }
            if (m.type === type) {
                // 命令
                if (type === MatchType.command) {
                    const matchResult = fuzzyjs.match(payload, m.label);
                    if (!matchResult.match) continue;
                    const result: FeatureInfo = assign({}, feature, {
                        matchField: m,
                        matchFieldHTML: fuzzyjs.surround(m.label, {
                            result: matchResult,
                            prefix: '<span class="tw-text-red-500">',
                            suffix: '</span>',
                        }),
                    });
                    
                    return result;
                }
            }
        }
    }

    findById(id: string) {
        return this.list.find(feature => feature.id === id);
    }

    async selectedFeature(id) {
        const feature = this.findById(id);
        if (!feature) return;

        if (feature.type === FeatureType.APPLICATION) {
            this.#applicationManager.selectedFeature(feature);
            return;
        }
        if (feature.type === FeatureType.PLUGIN) {
            // selectPlugin(feature);
            this.#pluginManager.selectedFeature(feature);
            return;
        }
    }
}

export const featureManager = new FeatureManager();