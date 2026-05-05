<template>
  <div class="container mt-4">

    <div class="text-center mb-4">
      <h2 class="fw-bold text-primary">Employee Management System</h2>
      <p class="text-muted">Vue.js + Axios + MockAPI</p>
    </div>

    <div v-if="form.id" class="alert alert-warning d-flex justify-content-between align-items-center">
      <strong> You are editing an employee</strong>
      <button class="btn btn-sm btn-dark" @click="resetForm">
        Cancel Edit
      </button>
    </div>

  
    <div class="card shadow-sm mb-4">
      <div class="card-body">

        <form @submit.prevent="saveEmployee">
          <div class="row g-3">

            <div class="col-md-3">
              <input v-model="form.name" class="form-control" placeholder="Employee Name" required />
            </div>

            <div class="col-md-3">
              <input v-model="form.designation" class="form-control" placeholder="Designation" required />
            </div>

            <div class="col-md-3">
              <input v-model="form.department" class="form-control" placeholder="Department" required />
            </div>

            <div class="col-md-2">
              <input v-model="form.salary" type="number" class="form-control" placeholder="Salary" required />
            </div>

            <div class="col-md-1 d-grid">
              <button class="btn btn-success">
                {{ form.id ? 'Update Employee' : 'Add Employee' }}
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>

  
    <div class="card shadow-sm">
      <div class="card-body">

        <table class="table table-hover table-bordered align-middle text-center">

          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr 
              v-for="emp in employees" 
              :key="emp.id"
              :class="{ 'table-warning': form.id === emp.id }"
            >

              <td>{{ emp.id }}</td>
              <td class="fw-semibold">{{ emp.name }}</td>
              <td>{{ emp.designation }}</td>

              <td>
                <span class="badge bg-info text-dark">
                  {{ emp.department }}
                </span>
              </td>

              <td class="text-success fw-bold">
                ₹ {{ emp.salary }}
              </td>

              <td>
                <button class="btn btn-warning btn-sm me-2" @click="editEmployee(emp)">
                   Edit
                </button>

                <button class="btn btn-danger btn-sm" @click="deleteEmployee(emp.id)">
                   Delete
                </button>
              </td>

            </tr>
          </tbody>

        </table>

      </div>
    </div>

  </div>
</template>

<script>
import api from './services/api'

export default {
  data() {
    return {
      employees: [],
      form: {
        id: null,
        name: '',
        designation: '',
        department: '',
        salary: ''
      }
    }
  },

  methods: {

    // READ
    async loadEmployees() {
      const res = await api.getEmployees()
      this.employees = res.data
    },

    // CREATE / UPDATE
    async saveEmployee() {
      if (this.form.id) {
        await api.updateEmployee(this.form.id, this.form)
      } else {
        await api.addEmployee(this.form)
      }
      this.resetForm()
      this.loadEmployees()
    },

    // EDIT
    editEmployee(emp) {
      this.form = { ...emp }

      // auto scroll to form
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    // DELETE
    async deleteEmployee(id) {
      await api.deleteEmployee(id)
      this.loadEmployees()
    },

    // RESET FORM
    resetForm() {
      this.form = {
        id: null,
        name: '',
        designation: '',
        department: '',
        salary: ''
      }
    }
  },

  mounted() {
    this.loadEmployees()
  }
}
</script>