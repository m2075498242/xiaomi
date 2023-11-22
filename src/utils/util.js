const common = {
    /**
     * 数据类型的检测封装
     */
    getDataType: (data) => {
        let toString = Object.prototype.toString;
        let str = toString.call(data)
        return str.substring(7, str.length - 1);
    },
    /**
     * 本地存储的封装
     */
    getLocalData: () => {

    }
};
/**
 * 本地存储
 */
const local = {
    //添加
    set: (data, obj) => localStorage.setItem(data, JSON.stringify(obj)),
    //获取
    get: data => localStorage.getItem(data),
    //移除
    remove: data => localStorage.removeItem(data),
    //清除所有
    clear: () => localStorage.clear(),
}
window.common = common;
window.local = local;