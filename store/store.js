import axios from 'axios'
import Cookies from 'js-cookie'
import Cookie from 'cookie'
import CookieParser from 'cookieparser'

const state = {
	tabIndex:0,
	store: null,
	loading:false,
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
	}
}

const actions = {
	getStore: ({commit}, params) => new Promise((resolve, reject) => {
		commit('LOADING_STORE')
		axios.get('/api/GetStore', {params, withCredentials:true}).then(response => {
			if(response.status == 200) {
				commit('GET_STORE', response.data.store)
			}
			resolve(response)
		}).catch(error => {
			reject(error)
		})
		setTimeout(() => {
			commit('LOADING_STORE')
		}, 1000)
	}) 
}

const getters = {
}

export default {
	state, mutations, actions, getters
}