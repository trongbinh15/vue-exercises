import http from "./http-common";
class DataService {
  getAll() {
        return http.get('/users')
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

export default new DataService;