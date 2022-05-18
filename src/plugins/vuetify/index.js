import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ru from 'vuetify/lib/locale/ru'
import uz from '@/plugins/vuetify/uz.js'
import preset from './default-preset/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdiSvg'
  },
  lang: {
    locales: { uz, ru },
    current: 'uz'
  },
  theme: {
    options: {
      customProperties: true,
      variations: false
    }
  }
})
