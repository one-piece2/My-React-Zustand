import { createStore } from "./createStore.jsx";
import { useStore } from "./useStore.jsx";
//create 函数用于创建一个 Zustand 风格的状态管理库实例
//createState：一个函数，接受 setState、getState 和 api 作为参数，用于初始化状态和定义状态更新逻辑
export const create = (createState) => {
    //调用 createStore 创建状态管理实例 api 并传入 createState 初始化状态
    const api = createStore(createState)

    const useBoundStore = (selector) => useStore(api, selector)

    Object.assign(useBoundStore, api);
//将 api 上的方法和属性 合并到 useBoundStore 上，使其既是一个钩子函数，又具有状态管理功能
    return useBoundStore
}