import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerList from '../components/Customers.vue'
import VehicleList from '../components/Fleet.vue'
import AppDashboard from '../components/Dashboard.vue'
import LoginPage from '../components/Login.vue'
import Authentication from "@/middleware/Auth"
import customerForm from '../components/customerForm.vue'
import OrdersList from '../components/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AppDashboard,
    meta: {
      middleware: [
        Authentication
      ]
    }
  },
  {
    path: '/customers',
    name: 'customerlist',
    component: CustomerList,
    meta: {
      middleware: [Authentication],
      },
  },
  {
    path: '/customer/:code?',
    name: 'customerForm',
    component: customerForm,
    props: true,
    meta: {
      middleware: [Authentication]
    }
  },
  {
    path: '/vehicles',
    name: 'Vehiclelist',
    component: VehicleList,
    meta: {
      middleware: [Authentication],
      },
  },
  {
    path: '/orders',
    name: 'ordersList',
    component: OrdersList,
    meta: {
      middleware: [Authentication],
      },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]
const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
  }
  return middleware[0]({
    ...context
  })
});
export default router
