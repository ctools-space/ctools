// import { ENV } from "typings/common";
export enum ENV {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production'
}

export enum Platform {
    darwin = 'darwin',
    win32 = 'win32',
    linux = 'linux'
}
export const isDarwin = process.platform === Platform.darwin;
export const isWin32 = process.platform === Platform.win32;
export const isLinux = process.platform === Platform.linux;

/**
 * todo 按需构建？
 */
export const isProd = process.env.NODE_ENV === ENV.PRODUCTION;

export const HeaderHeight = 56;
export const FeatureItemHeight = 56;
export const FeatureCount = 10;
export const WinWidth = 800;
export const WinHeight = HeaderHeight + FeatureCount * FeatureItemHeight;