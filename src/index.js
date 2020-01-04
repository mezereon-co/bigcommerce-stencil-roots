import MzHitGridItem from './HitGridItem.vue'
import './style.scss'

function install(Vue) {
  Vue.component('mz-hit-grid-item', MzHitGridItem)
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin

export { MzHitGridItem }
