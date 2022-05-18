<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <v-img
            :src="require('@/assets/images/logos/logo.png')"
            max-height="100px"
            max-width="200px"
            alt="logo"
            contain
            class="me-3"
          />
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p
            class="text-2xl font-weight-semibold text--primary mb-2 text-center"
          >
            Xush kelibsiz!
          </p>
          <!--          <p class="mb-2">Please sign-in to your account and start the adventure</p>-->
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="username"
              outlined
              placeholder="Login"
              hide-details
              class="mb-3"
            />

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              placeholder="Parol"
              :append-icon="
                isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
              "
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            />

            <v-alert v-model="e" type="error" outlined class="my-4">
              {{ errorMessage }}
            </v-alert>
            <v-btn block type="submit" color="primary" class="mt-6">
              Kirish
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="
        require(`@/assets/images/misc/mask-${
          $vuetify.theme.dark ? 'dark' : 'light'
        }.png`)
      "
      alt=""
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    />
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import useJwt from '@/auth/jwt/useJwt'

export default {
  methods: {
    login() {
      useJwt
        .login({
          username: this.username,
          password: this.password
        })
        .catch((e) => {
          this.errorMessage = e.response.data.detail
        })
        .then((response) => {
          useJwt.setToken(response.data.token)
          if (response.data.user_type === 1)
            this.$router.push({ name: 'reports-list' })
          else this.$router.push({ name: 'reports-add' })
        })
    }
  },
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
    const password = ref('')
    const e = ref(null)
    const errorMessage = ref('')
    return {
      isPasswordVisible,
      username,
      password,
      e,
      errorMessage,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
