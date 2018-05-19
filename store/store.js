import axios from 'axios'
import Cookies from 'js-cookie'
import Cookie from 'cookie'
import CookieParser from 'cookieparser'

const state = {
	tabIndex:0,
	store: null,
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
	}
}

const actions = {
	getStore: ({commit}, params) => new Promise((resolve, reject) => {
		axios.get('/api/GetStore', {params, withCredentials:true}).then(response => {
			if(response.status == 200) {
				commit('GET_STORE', response.data.store)
			}
			resolve(response)
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