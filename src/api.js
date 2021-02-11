import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8000/api',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data.data
    })
  },
  getProducts () {
    return this.execute('get', '/product')
  },
  getProduct (id) {
    return this.execute('get', `/product/${id}`)
  },
  createProduct (data) {
    return this.execute('post', '/product', data)
  },
  updateProduct (id, data) {
    return this.execute('put', `/product/${id}`, data)
  },
  deleteProduct (id) {
    return this.execute('delete', `/product/${id}`)
  }
}
