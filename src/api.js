import axios from 'axios'

const client = axios.create({
  baseURL: process.env.URL_API,
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
  getProductLog (id) {
    return this.execute('get', `/productLogs/${id}`)
  },
  createProduct (data) {
    return this.execute('post', '/product', data)
  },
  updateProduct (id, data) {
    return this.execute('put', `/product/${id}`, data)
  },
  updateProducts (data) {
    return this.execute('patch', `/product`, data)
  },
  deleteProduct (id) {
    return this.execute('delete', `/product/${id}`)
  },
  deleteProducts (data) {
    return this.execute('delete', `/product`, data)
  }

}
