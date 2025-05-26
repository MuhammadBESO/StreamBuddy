import { createApp } from 'vue'
import App from './App.vue'

// Import core Font Awesome library
import { library } from '@fortawesome/fontawesome-svg-core'

// Import icons you want
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

// Import FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(faTrash, faPlus, faEdit)

const app = createApp(App)

// Register font-awesome-icon globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
