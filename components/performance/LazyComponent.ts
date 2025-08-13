// // Lazy loading utility for non-critical components
// export const LazyComponent = React.lazy(() => 
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve(import('./SomeComponent'));
//     }, 100);
//   })
// );