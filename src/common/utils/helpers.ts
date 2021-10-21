/**
 * 判断是否网络资源
 * @param str 
 * @returns 
 */
export function isHttp(str: string) {
    return str ? str.match(/^http(s?):\/\//) : '';
}
