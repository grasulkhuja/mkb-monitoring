import axios from '@/libs/axios'

const OfficeService = {
  getDepartments: async (officeType) => {
    let data = null
    if (officeType === 'front') {
      const response = await axios.get('/departments/1')
      data = response.data
    }
    if (officeType === 'back') {
      const response = await axios.get('/departments/0')
      data = response.data
    }
    return data
  },
  getDepartmentPositions: async (departmentId) => {
    const { data } = await axios.get(`/positions/${departmentId}`)
    return data
  },
  getPositionTasks: async (positionId) => {
    const { data } = await axios.get(`/tasks/${positionId}`)
    return data
  },
  sendApplication: async (date, application) => {
    const { data } = await axios.post('/user-data/reports', {
      date,
      application
    })
    return data
  },
  getStatistics: async () => {
    const { data } = await axios.get('/admin-data/statistics')
    return data
  },
  downloadReport: async () => {
    const { data } = await axios.get('/admin-data/getxlsx', {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([data]))
    const linkElement = document.createElement('a')
    linkElement.href = url
    linkElement.setAttribute('download', `Statistika.xlsx`)
    document.body.appendChild(linkElement)
    linkElement.click()
    return new File([data], 'name')
  }
}

export default OfficeService
