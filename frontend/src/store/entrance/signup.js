import { SIGNUP_REQUEST, SIGNUP_ERROR, SIGNUP_SUCCESS } from './actions/entrance.actions'
import HTTP from '@/helpers/utils/http-constant'

const actions = {
  [SIGNUP_REQUEST]: ({ commit, dispatch }, signupData) => {
    return new Promise((resolve, reject) => {
      commit(SIGNUP_REQUEST)
      HTTP({
        method: 'POST',
        url: '/api/v1/entrance/signup',
        data: {
          firstName: signupData.firstName,
          name: signupData.name,
          emailAddress: signupData.emailAddress,
          password: signupData.password
        }
      })
        .then((resp) => {
          commit(SIGNUP_SUCCESS)
          resolve(resp)
        })
        .catch(err => {
          commit(SIGNUP_ERROR)
          reject(err)
        })
    })
  }
}

const mutations = {
  [SIGNUP_REQUEST]: (state) => {
    console.log('SIGNUP - loading')
  },
  [SIGNUP_SUCCESS]: (state, resp) => {
    console.log('SIGNUP - success')
  },
  [SIGNUP_ERROR]: (state, err) => {
    console.log('SIGNUP - error')
  }
}

export default {
  actions,
  mutations
}
