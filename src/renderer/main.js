import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ← ADD THIS

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faPlus, faEdit)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router) // ← ADD THIS
app.mount('#app')
