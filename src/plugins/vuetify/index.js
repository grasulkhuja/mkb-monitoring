import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ru from 'vuetify/lib/locale/ru'
import uz from '@/locales/uz'
import preset from './default-preset/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdiSvg'
  },
  lang: {
    locales: { ru, uz },
    current: localStorage.getItem('preferredLang')
  },
  theme: {
    options: {
      customProperties: true,
      variations: false
    }
  }
})
