import { HeaderHeight, FeatureItemHeight } from 'renderer/utils/const';

import { ENV } from '../../../typings/common';

export const isProd = process.env.NODE_ENV === ENV.PRODUCTION;

export const winSize = {
    width: 800,
    height: 56,
};
export const winMaxHeight = HeaderHeight + 10 * FeatureItemHeight;