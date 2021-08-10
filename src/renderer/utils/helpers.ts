// const { remote } = require('electron');

import { isBoolean } from '@pokemonon/knife';

// /**
//  * 相对renderer的路径
//  * @param path 
//  */
// export function resolve(path: string) {
//     const mainPath = remote.app.getAppPath();
//     return mainPath.replace(/dist\/main$/, `src/${path}`);
// }

export function transImage(src: string) {
    return src.startsWith('/') ? `file://${src}` : src;
}

/**
 * todo knife
 * 阻止滚动 达到阈值后触发回调
 * @param el 
 * @param param1 
 * @param cb 
 * @returns 
 */
export function scrollInThrottle(el: HTMLElement, { throttle }, cb = (e: WheelEvent) => {}) {
    let disY = 0;
    function listener(evt: WheelEvent) {
        evt.preventDefault();
        
        const { deltaY } = evt;

        if ((el.scrollTop === 0 && deltaY < 0) || (el.scrollTop >= el.clientHeight + el.scrollTop && deltaY > 0)) {
            return false;
        }

        disY += deltaY;
        if (Math.abs(disY) > throttle) {
            disY = 0;
            cb(evt);
        }
    }
    el.addEventListener('wheel', listener);

    return () => {
        el.removeEventListener('wheel', listener);
    };
}

/**
 * todo knife
 * 获取最近的滚动父元素
 * @param el 
 * @returns 
 */
export function getClosestParentScroller(el: HTMLElement): HTMLElement {
    const parent = el.parentElement;
    if (!parent || parent === document.body) return document.body;
    if (parent.clientHeight < parent.scrollHeight) {
        return parent;
    }
    return getClosestParentScroller(parent);
}

/**
 * 判断元素是否在y方向的可视区域内
 * @param el 
 * @param parent 
 * @param whole 
 * @returns 
 */
export function checkInScrollView(el: HTMLElement, parent?: HTMLElement, whole?: boolean): boolean {
    const argLen = arguments.length;

    if (argLen === 1) {
        parent = getClosestParentScroller(el);
        whole = true;
    } else if (argLen === 2) {
        if (isBoolean(parent)) {
            whole = parent;
            parent = getClosestParentScroller(el);
        } else {
            whole = true;
        }
    }

    if (!parent) return false;

    const parentBounds = parent.getBoundingClientRect();
    const elBounds = el.getBoundingClientRect();

    if (whole) {
        return elBounds.top >= parentBounds.top &&
            elBounds.bottom <= parentBounds.bottom;
    } else {
        return (elBounds.top >= parentBounds.top && elBounds.top <= parentBounds.bottom) ||
            (elBounds.bottom >= parentBounds.top && elBounds.bottom <= parentBounds.bottom);
    }
}
