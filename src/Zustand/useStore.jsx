import {  useSyncExternalStore } from "react";
export function useStore(api, selector) {
//   const [, forceRender] = useState(0);
  //组件挂载时订阅状态变化 状态变化时调用 selector 比较新旧状态的选中部分是否变化，变化则触发组件重新渲染
//   useEffect(() => {
//     api.subscribe((state, prevState) => {
//       const newObj = selector(state);
//       const oldobj = selector(prevState);

//       if (newObj !== oldobj) {
//         forceRender(Math.random());
//       }
//     });
//   }, []);
//   return selector(api.getState());
const getState=()=>selector(api.getState());
return useSyncExternalStore(api.subscribe,getState);
}
