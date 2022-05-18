<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Izlash"
              single-line
              hide-details
              outlined
              dense
            />
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="reportsTableHeaders" :items="statistics" :search="search">
              <template v-slot:[`item.created_at`]="{ item }">
                {{ new Date(item.created_at).toLocaleString() }}
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click.prevent="downloadReport" color="primary"> Yuklab olish </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { createDateFilter } from 'vue-date-fns'
import locale from 'date-fns/locale/uz'
export default {
  name: 'ReportsView',
  filters: {
    date: createDateFilter('dd MMMM yyyy HH:mm', { locale }),
  },
  methods: {
    downloadReport() {
      this.$store.dispatch('office/downloadReport')
    },
  },
  created() {
    this.$store.dispatch('office/fetchStatistics')
  },
  computed: {
    ...mapGetters('office', ['statistics']),
  },
  data() {
    return {
      search: null,
      reportsTableHeaders: [
        { text: '#', value: 'id', divider: true },
        { text: 'Hodim', value: 'full_name', divider: true },
        { text: 'Struktura', value: 'structure_name', divider: true },
        // { text: 'Departament', value: 'department_name', divider: true },
        { text: 'Lavozim', value: 'position_name', divider: true },
        { text: 'Faoliyat turi', value: 'task_name', divider: true },
        { text: 'Soni', value: 'quantity', divider: true },
        { text: 'Sarflagan vaqti (daqiqa)', value: 'time', divider: true },
        { text: "Qo'shimcha ma'lumot", value: 'comment', divider: true },
        { text: 'Hisobot sanasi', value: 'added_date', divider: true },
        { text: 'Hisobot yuborilgan sana', value: 'created_at', divider: true },
      ],
    }
  },
}
</script>

<style scoped></style>
