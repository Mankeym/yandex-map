import { createApp } from 'vue'
import App from './App.vue'
import YmapPlugin from 'vue-yandex-maps'
const settings = {
    apiKey: '70e1d3a5-f1b4-4ec8-ba5b-4e4356e6234e',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1',
    csp: true
}
const app = createApp(App)
    .use(YmapPlugin, settings)
app.mount('#app')
