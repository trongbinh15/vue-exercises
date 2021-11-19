import http from "./http-common";
class UserService {
  getAll() {
    return http.get('/users')
    .then(response => {
      this.info = response.data
    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
  }
  getDetail(id) {
    return http.get(`/users/${id}`)
  }
  addOne(info) {
    return http.post(`/users`, info)
  }
  updateOne(info) {
    return http.put(`/users/${info.id}`, info)
  }

  deleteOne(id) {
    return http.delete(`/users/${id}`)
  }
}

export default UserService;