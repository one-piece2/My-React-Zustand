export const createStore = (createState) => {
    let state;
    //存储状态监听器（回调函数）的集合，用于在状态更新时通知所有订阅者
    const listeners = new Set();
  //replace：布尔值，true 表示直接替换状态，false 表示合并状态（默认）
    const setState = (partial, replace) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial
//通过 Object.is(nextState, state) 判断状态是否真的变化（避免无效更新）
      if (!Object.is(nextState, state)) {
        const previousState = state;

        if(!replace) {
            state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
        } else {
            state = nextState;
        }
        listeners.forEach((listener) => listener(state, previousState));
      }
    }
  
    const getState = () => state;
  //订阅状态变化
    const subscribe= (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  
    const destroy= () => {
      listeners.clear()
    }
  //定义对外暴露的方法集合
    const api = { setState, getState, subscribe, destroy }
//调用传入的 createState 函数初始化状态，同时将 setState 等方法传递给它，允许在初始化时定义带更新逻辑的状态（类似 Zustand 中 create 函数的回调）。
    state = createState(setState, getState, api)

    return api
}