import OfficeService from '@/services/api/office.service'

export const namespaced = true

export const state = {
  officeType: null,
  departments: [],
  departmentPositions: [],
  positionTasks: [],
  statistics: []
}
export const mutations = {
  SET_OFFICE_TYPE(state, officeType) {
    state.officeType = officeType
  },
  SET_DEPARTMENTS(state, departments) {
    state.departments = departments
  },
  SET_DEPARTMENT_POSITIONS(state, positions) {
    state.departmentPositions = positions
  },
  SET_POSITION_TASKS(state, tasks) {
    state.positionTasks = tasks
  },
  SET_STATISTICS(state, statistics) {
    state.statistics = statistics
  }
}
export const actions = {
  fetchDepartments: async ({ commit, state }) => {
    const departments = await OfficeService.getDepartments(state.officeType)
    commit('SET_DEPARTMENTS', departments)
  },
  fetchDepartmentPositions: async ({ commit }, { departmentId }) => {
    const positions = await OfficeService.getDepartmentPositions(departmentId)
    commit('SET_DEPARTMENT_POSITIONS', positions)
  },
  fetchPositionTasks: async ({ commit }, { positionId }) => {
    const tasks = await OfficeService.getPositionTasks(positionId)
    commit('SET_POSITION_TASKS', tasks)
  },
  sendApplication: async (context, { date, tasks }) => {
    return await OfficeService.sendApplication(date, tasks)
  },
  fetchStatistics: async ({ commit }) => {
    const statistics = await OfficeService.getStatistics()
    commit('SET_STATISTICS', statistics)
  },
  downloadReport: async () => {
    return await OfficeService.downloadReport()
  }
}
export const getters = {
  departments: (state) => state.departments,
  departmentPositions: (state) => state.departmentPositions,
  positionTasks: (state) => state.positionTasks,
  statistics: (state) => state.statistics
}
