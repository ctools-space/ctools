import execa from 'execa';

import { FeatureBase, FeatureType } from 'main/feature';
import { hash } from 'main/utils/common/index';

import { ApplicationInfo, loadApplications } from './load';

export interface ApplicationFeature extends FeatureBase {
    type: FeatureType.APPLICATION;
}

export class ApplicationManager {
    list!: ApplicationInfo[];
    features!: ApplicationFeature[]

    constructor() {

    }

    init() {
        return this.reload();
    }

    async reload() {
        this.list = await loadApplications();
        this.features = this.getAllFeatures();
    }

    getAllFeatures() {
        const result: ApplicationFeature[] = [];

        for (const application of this.list) {
            const { name, logo, path } = application;

            const f: ApplicationFeature = {
                id: hash(path),
                type: FeatureType.APPLICATION,
                name,
                logo,
                path,

                matches: [name],
                matchField: '',
                matchFieldHTML: '',
            };

            result.push(f);
        }

        return result;
    }

    async selectedFeature(feature: ApplicationFeature) {
        await execa('open', [feature.path]);
    }
}