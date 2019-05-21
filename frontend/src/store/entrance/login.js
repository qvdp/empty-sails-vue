import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS } from './actions/entrance.actions'
import HTTP from '@/helpers/utils/http-constant'

const state = {
  token: localStorage.getItem('user-token') || ''
}

const getters = {
  isAuthenticated: state => !!state.token
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      HTTP({
        method: 'POST',
        url: '/api/v1/entrance/login',
        data: {
          emailAddress: data.emailAddress,
          password: data.password
        }
      })
        .then(resp => {
          commit(AUTH_SUCCESS, resp)
          resolve()
        })
        .catch((err) => {
          commit(AUTH_ERROR)
          dispatch(AUTH_LOGOUT)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      commit(AUTH_LOGOUT_SUCCESS)
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    console.log('AUTH - loading')
  },
  [AUTH_SUCCESS]: (state, resp) => {
    console.log('AUTH - success')
    state.token = localStorage.getItem('user-token')
  },
  [AUTH_ERROR]: (state) => {
    console.log('AUTH - error')
  },
  [AUTH_LOGOUT]: (state) => {
    console.log('LOGOUT - loading')
  },
  [AUTH_LOGOUT_SUCCESS]: (state) => {
    console.log('LOGOUT - success')
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
