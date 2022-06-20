import axios from '@/libs/axios'

const AuthService = {
  login: async (userCredentials) => {
    const { data } = await axios.post('/api/auth/login', userCredentials)
    return data
  },
  getUserData: async () => {
    const { data } = await axios.get('/user-data/getall')
    return data
  }
}

export default AuthService
