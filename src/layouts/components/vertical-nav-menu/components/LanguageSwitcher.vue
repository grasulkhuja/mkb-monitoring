<template>
  <v-select
    flat
    class="mt-6 lang-switcher"
    solo
    dense
    :items="languages"
    v-model="currentLang"
    item-text="title"
    item-value="value"
    append-icon=""
  >
    <template v-slot:selection="{ item }">
      <v-img
        class="mr-2"
        :src="require(`@/assets/images/flags/${item.value}.png`)"
        max-width="25"
        max-height="25"
      />
    </template>
    <template v-slot:item="{ item }">
      <v-img
        class="mr-2"
        :src="require(`@/assets/images/flags/${item.value}.png`)"
        max-width="25"
        max-height="25"
      />
      {{ item.title }}
    </template>
  </v-select>
</template>

<script>
import { mdiTranslate } from '@mdi/js'

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      icons: {
        mdiTranslate
      },
      currentLang: localStorage.getItem('preferredLang') || this.$i18n.locale,
      languages: [
        { id: 1, title: "O'zbek", value: 'uz' },
        { id: 2, title: 'Русский', value: 'ru' }
      ]
    }
  },
  created() {
    this.$i18n.locale = this.currentLang
    this.$vuetify.lang.current = this.currentLang
  },
  watch: {
    currentLang() {
      localStorage.setItem('preferredLang', this.currentLang)
      this.$i18n.locale = this.currentLang
      this.$vuetify.lang.current = this.currentLang
    }
  }
}
</script>

<style scoped>
.lang-switcher {
  max-width: 50px;
}
</style>
