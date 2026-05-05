import axios from 'axios'

const API_URL = 'https://69f8733cf7044aa0103ddd54.mockapi.io/api/employees'

export default {
  getEmployees() {
    return axios.get(API_URL)
  },
  addEmployee(emp) {
    return axios.post(API_URL, emp)
  },
  updateEmployee(id, emp) {
    return axios.put(`${API_URL}/${id}`, emp)
  },
  deleteEmployee(id) {
    return axios.delete(`${API_URL}/${id}`)
  }
}