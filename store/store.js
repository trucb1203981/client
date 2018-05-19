import axios from 'axios'
import Cookies from 'js-cookie'
import Cookie from 'cookie'
import CookieParser from 'cookieparser'

const state = {
	tabIndex:0,
	store: null,
	loading:false,
	rightDrawer:false,
	headers: [
	{title: 'Danh mục'},
	{title: 'Giỏ hàng'}
	]
}

const mutations = {
	CHANGE_TAB(state, tabIndex) {
		if(state.tabIndex != tabIndex ){
			state.tabIndex = tabIndex
		}
	},
	GET_STORE(state, payload) {
		state.store = payload
	},
	LOADING_STORE(state) {
		state.loading = !state.loading
	},
	STORE_NAV_RIGHT(state) {
		state.rightDrawer = !state.rightDrawer
	}
}

const actions = {
	getStore: ({commit}, params) => new Promise((resolve, reject) => {
		commit('LOADING_STORE')
		axios.get('/api/GetStore', {params, withCredentials:true}).then(async (response) => {
			if(response.status == 200) {
				commit('GET_STORE', response.data.store)
			}
			await resolve(response)
			setTimeout(() => {
				commit('LOADING_STORE')
			}, 500)
		}).catch(error => {
			reject(error)
		})

	}) 
}

const getters = {
}

export default {
	state, mutations, actions, getters
}