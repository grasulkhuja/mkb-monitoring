<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card v-if="user" class="mb-2">
          <v-card-title>
            <span class="headline font-weight-black">
              Фойдаланувчи маълумотлари
            </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <p class="text-h6">
                  <span class="font-weight-bold">Исми: </span>
                  {{ user.employee_name }}
                </p>

                <p class="text-h6">
                  <span class="font-weight-bold">Ишлаш жойи: </span>
                  <span v-if="user.governance_name"
                    >{{ user.governance_name }}
                  </span>
                  <span v-if="user.block_name">{{ user.block_name }} </span>
                  <span v-if="user.department_name"
                    >{{ user.department_name }}
                  </span>
                  <span v-if="user.management_name"
                    >{{ user.management_name }}
                  </span>
                  <span v-if="user.division_name"
                    >{{ user.division_name }}
                  </span>
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p class="text-h6">
                  <span class="font-weight-bold">Филиал номи: </span>
                  {{ user.branch_name }}
                </p>
                <p class="text-h6">
                  <span class="font-weight-bold">Лавозими: </span>
                  <span>{{ user.position_name }}</span>
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <span class="ml-4 pb-5">
              Лавозим мажбуриятлари формасини тўлдиринг
            </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="4" md="2">
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
                      label="Санани танланг"
                      prepend-icon="mdi-calendar"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                      class="ml-4"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="dateMenu = false"
                    :first-day-of-week="1"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-form
              @submit.prevent="sendApplication"
              v-model="valid"
              ref="form"
              v-if="user"
            >
              <v-card flat>
                <v-card-text>
                  <v-row v-for="(task, index) in completedTasks" :key="task.id">
                    <v-col cols="12" md="6">
                      <div class="d-flex">
                        <span
                          class="mt-3 mr-2 font-weight-semibold text-body-1"
                        >
                          {{ index + 1 }}.
                        </span>
                        <v-autocomplete
                          v-model="task.task_id"
                          :items="user.tasks"
                          :rules="requiredRules"
                          item-value="task_id"
                          item-text="task_name"
                          outlined
                          dense
                          placeholder="Мажбурият номи"
                          hint="Мажбурият номини танланг"
                          required
                          :success="task.task_id > 0"
                          class="required"
                        >
                        </v-autocomplete>
                      </div>
                    </v-col>
                    <v-col cols="12" md="1">
                      <v-text-field
                        v-model="task.quantity"
                        oninput="this.value = this.value.replace(/[^1-9.]/g, '')"
                        :rules="requiredRules"
                        :success="task.quantity > 0"
                        type="number"
                        outlined
                        dense
                        placeholder="Сони"
                        hint="Сонини киритинг"
                        required
                      />
                    </v-col>
                    <v-col cols="12" md="1">
                      <v-text-field
                        oninput="this.value = this.value.replace(/[^\d.]/g, '')"
                        type="number"
                        v-model="task.hour"
                        :rules="hourRules"
                        :success="
                          task.hour !== null && task.minute > 0 && task.hour > 0
                        "
                        outlined
                        dense
                        placeholder="Соат"
                        required
                        :error="
                          task.hour !== null &&
                          Number(task.hour) + Number(task.minute) === 0
                        "
                      />
                    </v-col>
                    <v-col cols="12" md="1">
                      <v-text-field
                        type="number"
                        oninput="this.value = this.value.replace(/[^\d.]/g, '')"
                        v-model="task.minute"
                        :rules="minuteRules"
                        :success="
                          task.minute !== null &&
                          task.minute > 0 &&
                          task.hour > 0
                        "
                        outlined
                        dense
                        placeholder="Дақиқа"
                        required
                        :error="
                          task.minute !== null &&
                          Number(task.hour) + Number(task.minute) === 0
                        "
                      />
                    </v-col>
                    <v-col cols="12" :md="completedTasks.length > 1 ? 2 : 3">
                      <v-textarea
                        v-model="task.comment"
                        rows="1"
                        outlined
                        dense
                        placeholder="Қўшимча маълумот"
                        hint="Қўшимча маълумот"
                        auto-grow
                        counter="100"
                      />
                    </v-col>
                    <v-col v-if="completedTasks.length > 1" cols="12" md="1">
                      <v-btn
                        @click.prevent="removeTask(index)"
                        icon
                        color="error"
                        class="ml-5"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-divider v-if="completedTasks.length > 1" />
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-btn
                        v-if="user.tasks.length > completedTasks.length"
                        color="primary"
                        outlined
                        @click.prevent="addTask"
                      >
                        Қўшиш
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text>
                  <v-alert v-model="isSameTasksChoose" color="error" dark>
                    <span v-for="sameTask in choosenSameTasks" :key="sameTask">
                      {{ sameTask }} -
                    </span>
                    <span> лар бир хил бўлиб қолди</span>
                  </v-alert>
                  <v-alert v-model="isShowSpentTimeForTask" color="error" dark>
                    Мажбурият учун сарфланган умумий вақт 0 га тенг бўлиши
                    мумкин эмас
                  </v-alert>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <p class="font-weight-semibold text-body-1">
                    <span>Умумий сарфланган вақт: </span
                    >{{ totalSpentTime.days }} кун,
                    {{ totalSpentTime.hours }} соат,
                    {{ totalSpentTime.minutes }} дақиқа
                  </p>
                </v-card-actions>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    class="mt-6"
                    color="primary"
                    type="submit"
                    @click.prevent="sendApplication"
                    :disabled="!valid"
                  >
                    Аризани жўнатиш
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-card-text>
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
  name: 'AddReportView',
  data() {
    return {
      valid: false,
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
          comment: ''
        }
      ],
      requiredRules: [(v) => !!v || 'Тўлдирилиши керак'],
      hourRules: [
        (v) => !!v || 'Тўлдирилиши керак',
        (v) => (v >= 0 && v <= 23) || 'Нотўғри киритилди (0-23)'
      ],
      minuteRules: [
        (v) => !!v || 'Тўлдирилиши керак',
        (v) => (v >= 0 && v <= 59) || 'Нотўғри киритилди (0-59)'
      ],
      showSnackbar: null,
      message: null,
      status: null,
      isSameTasksChoose: false,
      choosenSameTasks: [],
      spentTimeForTask: 0,
      isShowSpentTimeForTask: false
    }
  },
  computed: {
    ...mapGetters('office', [
      'departments',
      'departmentPositions',
      'positionTasks'
    ]),
    ...mapGetters('auth', ['user']),
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
    }
  },
  methods: {
    sendApplication() {
      this.$store
        .dispatch('office/sendApplication', {
          date: this.date,
          tasks: this.completedTasks
        })
        .then((response) => {
          if (response.result === 'OK') {
            this.showSnackbar = true
            this.status = 'success'
            this.message = 'Ариза мувофаққиятли жўнатилди'
            this.completedTasks = [
              {
                task_id: null,
                quantity: null,
                hour: null,
                minute: null,
                comment: ''
              }
            ]
            this.$refs.form.reset()
          }
        })
        .catch(() => {
          this.showSnackbar = true
          this.status = 'error'
          this.message = 'Аризани жўнатишда хатолик юз берди'
        })
    },
    addTask() {
      this.completedTasks.push({
        task_id: null,
        quantity: null,
        hour: null,
        minute: null,
        comment: ''
      })
    },
    removeTask(index) {
      this.completedTasks.splice(index, 1)
    }
  },
  created() {
    this.$store.dispatch('auth/fetchUserData')
  },
  watch: {
    completedTasks: {
      handler() {
        this.valid = true
        if (this.completedTasks.length > 1) {
          this.choosenSameTasks = []
          this.isSameTasksChoose = false
          for (let i = 0; i < this.completedTasks.length; i++) {
            for (let j = i + 1; j < this.completedTasks.length; j++) {
              if (
                this.completedTasks[i].task_id ===
                  this.completedTasks[j].task_id &&
                this.completedTasks[i].task_id !== null
              ) {
                this.isSameTasksChoose = true
                this.valid = false
                this.choosenSameTasks.push(i + 1, j + 1)
                this.choosenSameTasks = [...new Set(this.choosenSameTasks)]
              }
            }
          }
        }
      },
      deep: true
    }
  }
}
</script>
