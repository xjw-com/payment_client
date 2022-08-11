import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElemenPlus
import 'element-plus/theme-chalk/index.css'//所有的css
import ElementPlus from 'element-plus'


// 引入ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 引入vex-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

createApp(App).use(store).use(router).use(ElementPlus).use(Antd).use(VXETable).mount('#app')
