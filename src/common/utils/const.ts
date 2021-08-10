export enum Platform {
    darwin = 'darwin',
    win32 = 'win32',
    linux = 'linux'
}
export const isDarwin = process.platform === Platform.darwin;
export const isWin32 = process.platform === Platform.win32;
export const isLinux = process.platform === Platform.linux;