<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card flat color="grey lighten-4">
          <v-card-actions>
            <v-stepper v-model="step" vertical width="100%">
              <v-stepper-step :complete="step > 1" step="1"> Departmentni tanlang </v-stepper-step>

              <v-stepper-content step="1">
                <v-card flat>
                  <v-card-text>
                    <v-select
                      v-model="department"
                      outlined
                      placeholder="Departmentni tanlang"
                      :items="departments"
                      item-text="department_name"
                      item-value="id"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="secondary" outlined @click.prevent="backToChooseOfficeType">
                      Ofis turini tanlashga qaytish
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-step :complete="step > 2" step="2"> Lavozimni tanlang </v-stepper-step>

              <v-stepper-content step="2">
                <v-card flat>
                  <v-card-text>
                    <v-select
                      v-model="position"
                      outlined
                      placeholder="Lavozimni tanlang"
                      :items="departmentPositions"
                      item-text="position_name"
                      item-value="id"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="secondary" outlined @click.prevent="backToChooseDepartment">
                      Departament tanlashga qaytish
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-step :complete="step > 3" step="3">
                Lavozim majburiyatlari formasini to'ldiring
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-form @submit.prevent="sendApplication" v-model="valid" ref="form">
                  <v-card flat>
                    <v-card-text>
                      <v-spacer />
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="dateMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Sanani tanlang"
                              prepend-icon="mdi-calendar"
                              readonly
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="dateMenu = false"
                            :first-day-of-week="1"
                          />
                        </v-menu>
                      </v-col>
                    </v-card-text>
                    <v-card-text>
                      <v-row v-for="(task, index) in completedTasks" :key="task.id">
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            v-model="task.task_id"
                            :items="positionTasks"
                            :rules="requiredRules"
                            item-value="id"
                            item-text="task_name"
                            outlined
                            dense
                            placeholder="Majburiyat nomi"
                            hint="Majburiyat nomini tanlang"
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-text-field
                            v-model="task.quantity"
                            :rules="requiredRules"
                            type="number"
                            outlined
                            dense
                            placeholder="Soni"
                            hint="Sonini kiriting"
                            required
                            rows="1"
                            auto-grow
                          />
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-text-field
                            type="number"
                            v-model="task.hour"
                            :rules="hourRules"
                            outlined
                            dense
                            placeholder="Soat"
                            hint=""
                            required
                          />
                        </v-col>
                        <v-col cols="12" md="1">
                          <v-text-field
                            type="number"
                            v-model="task.minute"
                            :rules="minuteRules"
                            outlined
                            dense
                            placeholder="Daqiqa"
                            hint=""
                            required
                          />
                        </v-col>
                        <v-col cols="12" :md="completedTasks.length > 1 ? 2 : 3">
                          <v-textarea
                            v-model="task.comment"
                            rows="1"
                            outlined
                            dense
                            placeholder="Qo'shimcha ma'lumot"
                            hint="Qo'shimcha ma'lumot"
                            auto-grow
                            counter="50"
                          />
                        </v-col>
                        <v-col v-if="completedTasks.length > 1" cols="12" md="1">
                          <v-btn @click.prevent="removeTask(index)" icon color="error" class="ml-5">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                        <v-divider v-if="completedTasks.length > 1" />
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-btn
                            v-if="positionTasks.length > completedTasks.length"
                            color="primary"
                            outlined
                            @click.prevent="addTask"
                          >
                            Qo'shish
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <p>
                        <span>Umumiy sarflangan vaqt: </span>{{ totalSpentTime.days }} kun,
                        {{ totalSpentTime.hours }} soat, {{ totalSpentTime.minutes }} daqiqa
                      </p>
                    </v-card-actions>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        class="mt-6"
                        color="secondary"
                        outlined
                        @click.prevent="backToChoosePosition"
                      >
                        Lavozim tanlashga qaytish
                      </v-btn>
                      <v-btn
                        class="mt-6"
                        color="primary"
                        type="submit"
                        @click.prevent="sendApplication"
                        :disabled="!valid"
                      >
                        Arizani jo'natish
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-stepper-content>
            </v-stepper>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar" :color="status">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OfficeView',
  data() {
    return {
      valid: false,
      step: 1,
      department: null,
      position: null,
      dateMenu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      completedTasks: [
        {
          task_id: null,
          quantity: null,
          hour: null,
          minute: null,
          comment: null,
        },
      ],
      requiredRules: [(v) => !!v || "To'ldirilishi kerak"],
      hourRules: [
        (v) => !!v || "To'ldirilishi kerak",
        (v) => (v >= 0 && v <= 23) || "Noto'g'ri kiritildi (0-23)",
      ],
      minuteRules: [
        (v) => !!v || "To'ldirilishi kerak",
        (v) => (v >= 0 && v <= 59) || "Noto'g'ri kiritildi (0-59)",
      ],
      showSnackbar: null,
      message: null,
      status: null,
    }
  },
  watch: {
    department(departmentId) {
      if (departmentId !== null) {
        this.$store
          .dispatch('office/fetchDepartmentPositions', {
            departmentId,
          })
          .then(() => {
            this.step = 2
          })
      }
    },
    position(positionId) {
      if (positionId !== null) {
        this.$store
          .dispatch('office/fetchPositionTasks', {
            positionId,
          })
          .then(() => {
            this.step = 3
          })
      }
    },
  },
  computed: {
    ...mapGetters('office', ['departments', 'departmentPositions', 'positionTasks']),
    // selectableTasks(item) {
    //   return this.positionTasks.filter((task) => {
    //     return !this.completedTasks.some((completedTask) => completedTask.task_id === task.id)
    //   })
    // },
    totalSpentTime() {
      let total = this.completedTasks.reduce((acc, task) => {
        return acc + Number(task.hour) * 60 + Number(task.minute)
      }, 0)
      const days = Math.floor(total / (60 * 24))
      total -= days * (60 * 24)
      const hours = Math.floor(total / 60)
      total -= hours * 60
      const minutes = total
      return { days, hours, minutes }
    },
  },
  created() {
    this.$store.dispatch('office/fetchDepartments', {
      officeType: this.$store.state.office.officeType,
    })
  },
  methods: {
    sendApplication() {
      this.$store
        .dispatch('office/sendApplication', {
          tasks: this.completedTasks,
        })
        .then((response) => {
          if (response.result === 'OK') {
            this.showSnackbar = true
            this.status = 'success'
            this.message = "Ariza muvaffaqiyatli jo'natildi"
            this.$refs.form.reset()
            setTimeout(() => {
              location.reload()
            }, 1500)
          }
        })
        .catch(() => {
          this.showSnackbar = true
          this.status = 'error'
          this.message = "Ariza jo'natishda xatolik yuz berdi"
        })
    },
    addTask() {
      this.completedTasks.push({
        task_id: null,
        quantity: null,
        hour: null,
        minute: null,
        comment: null,
      })
    },
    backToChooseOfficeType() {
      location.reload()
    },
    backToChooseDepartment() {
      this.department = null
      this.step = 1
    },
    backToChoosePosition() {
      this.completedTasks = [
        {
          task_id: null,
          quantity: null,
          hour: null,
          minute: null,
          comment: null,
        },
      ]
      this.$refs.form.reset()
      this.position = null
      this.step = 2
    },
    removeTask(index) {
      this.completedTasks.splice(index, 1)
    },
  },
  beforeDestroy() {
    clearTimeout()
  },
}
</script>
