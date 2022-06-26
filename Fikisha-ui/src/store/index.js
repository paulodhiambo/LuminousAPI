import Vue from 'vue'
import Vuex from 'vuex'
import instance from "@/service";
import router from '../router'

Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    state: {
        user: null,
        token: null,
        customers: [],
        customer: {},
        vehicles: [],
        vehicle: {},
        orders: []
    },
    getters: {
        customers: state => state.customers,
        customer: state => state.customer,
        vehicles: state => state.vehicles,
        vehicle: state => state.vehicle,
        orders: state => state.orders
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data
        }
    },
    actions: {
        login({commit}, payload) {
            console.log(commit)
            instance('post', `auth/signin`, payload)
                .then(res => {
                    localStorage.setItem('Fikisha_user', JSON.stringify(res.data.data))
                    localStorage.setItem('Fikisha_token', res.data.token)
                    Event.$emit('ApiSuccess', 'Logging In...')
                    window.location.replace('/dashboard')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Incorrect credentials')
                })
        },
        logout() {
            instance('post', `logout`)
                .then(() => {
                    localStorage.clear();
                    router.push('/login')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Unable to log out')
                })
        },
        addCustomer({dispatch}, payload) {
            instance('post', 'customers', payload)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Customer Successfully added')
                    router.push('/customers')
                    dispatch('getCustomers')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error adding customer')

                })
        },
        getCustomers({commit}) {
            instance('get', 'customers')
                .then((res) => {
                    commit('MUTATE', {state: 'customers', data: res.data.data})
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error getting customers')

                })
        },
        getCustomer({commit}, id) {
            instance('get', `customers/${id}`)
                .then((res) => {
                    commit('MUTATE', {state: 'customer', data: res.data.data})
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error getting customer')

                })
        },
        updateCustomer({dispatch}, payload) {
            instance('patch', `customers/${payload.id}`, payload)
                .then(() => {
                    router.push('/customers')
                    dispatch('getCustomers')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error updating customer')

                })
        },
        removeCustomer({dispatch}, id) {
            instance('delete', `customers/${id}`)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Customer Successfully removed')
                    router.push('/customers')
                    dispatch('getCustomers')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error deleting customer')

                })
        },
        addVehicle({dispatch}, payload) {
            instance('post', 'fleet', payload)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Vehicle Successfully added')
                    dispatch('getVehicles')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error adding customer')

                })
        },
        getVehicles({commit}) {
            instance('get', 'fleet')
                .then((res) => {
                    commit('MUTATE', {state: 'vehicles', data: res.data.data})
                })
                .catch(() => {
                })
        },
        getVehicle({commit}, id) {
            instance('get', `fleet/${id}`)
                .then((res) => {
                    commit('MUTATE', {state: 'vehicle', data: res.data.data})
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Unable to get vehicle')

                })
        },
        updateVehicle({dispatch}, payload) {
            instance('patch', `fleet/${payload.id}`, payload)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Vehicle Successfully updated')
                    dispatch('getVehicles')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Unable to update vehicle')

                })
        },
        removeVehicle({dispatch}, id) {
            instance('delete', `fleet/${id}`)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Vehicle Successfully removed')
                    router.push('/vehicles')
                    dispatch('getVehicles')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Unable to delete vehicle')

                })
        },
        getOrders({commit}) {
            instance('get', 'orders')
                .then((res) => {
                    commit('MUTATE', {state: 'orders', data: res.data.data})
                })
                .catch(() => {
                })
        },

        allocateOrder({dispatch}, payload) {
            instance('post', 'orders', payload)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Order allocated')
                    dispatch('getVehicles')
                    dispatch('getOrders')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error allocating order')

                })
        },

        dispatchOrders({dispatch}, payload) {
            instance('put', 'orders', payload)
                .then(() => {
                    Event.$emit('ApiSuccess', 'Vehicle dispatched')
                    dispatch('getOrders')
                    dispatch('getVehicles')
                })
                .catch(() => {
                    Event.$emit('ApiError', 'Error dispatching vehicle')

                })
        },
    }
})
