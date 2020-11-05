# Routerize for Vue.js

A simple tool to process `<a>` elements clicks through Vue Router, whenever possible.

## Usage

```javascript
import routerize from '../../routerize'

Vue.use(routerize);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```
