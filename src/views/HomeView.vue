<template>
  <v-card>
    <v-row justify="center">
      <v-dialog v-model="isChoosingOffice" persistent max-width="500">
        <v-card class="pb-8">
          <v-toolbar color="primary" dark>
            <v-toolbar-title class="text-h5 text-uppercase mx-auto">
              Iltimos ofis turini tanlang
            </v-toolbar-title>
          </v-toolbar>
          <v-card-title class="text-uppercase"> </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              class="mr-6"
              outlined
              large
              @click="chooseFrontOffice"
            >
              Front Ofis
            </v-btn>
            <v-btn
              color="green darken-1"
              class="ml-6"
              outlined
              large
              @click="chooseBackOffice"
            >
              Back Ofis
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      isChoosingOffice: true
    }
  },
  methods: {
    chooseFrontOffice() {
      this.$store.commit('office/SET_OFFICE_TYPE', 'front')
      this.$router.push({ name: 'office' })
    },
    chooseBackOffice() {
      this.$store.commit('office/SET_OFFICE_TYPE', 'back')
      this.$router.push({ name: 'office' })
    }
  }
}
</script>
