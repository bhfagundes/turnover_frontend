import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-57155543.okta.com/oauth2/default',
  client_id: '0oa5of6abPhCdWeF75d6',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Product
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export default router
