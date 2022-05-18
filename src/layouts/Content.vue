<template>
  <v-app>
    <v-app-bar app absolute class="rounded-lg" color="primary" dark>
      <div class="boxed-container w-full">
        <div class="d-flex align-center mx-6">
          <v-img src="@/assets/images/logos/logo1 (2).png" max-width="140" class="ml-4 mt-2" />
          <!--          <p class="mb-0 font-weight-black text&#45;&#45;white">MIKROKREDITBANK</p>-->
          <!-- Left Content -->
          <v-spacer></v-spacer>

          <!-- Right Content -->
          <theme-switcher />
          <log-out-button />
        </div>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <div class="app-content-container boxed-container w-full pa-6">
        <slot></slot>
      </div>
    </v-main>

    <v-footer app inset color="transparent" absolute height="56" class="px-0">
      <div class="boxed-container w-full">
        <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2022
            <a href="https://mikrokreditbank.uz" class="text-decoration-none" target="_blank">
              Mikrokreditbank
            </a>
          </span>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import LogOutButton from '@/layouts/components/LogOutButton'

export default {
  name: 'LayoutContent',
  components: {
    LogOutButton,
    ThemeSwitcher,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar ::v-deep {
  .v-toolbar__content {
    padding: 0;

    .app-bar-search {
      .v-input__slot {
        padding-left: 18px;
      }
    }
  }
}

.boxed-container {
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
