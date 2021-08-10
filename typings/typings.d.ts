
interface Window {
    /** 浏览器下开发，关闭 electron 载入动画 */
    stopLoading: () => void
}

// ws传参的数据结构
interface WSParams {
    clientName?: string;
    event?: string;
    params?: Record<string, any>;
}

