import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

// --------------------------------------------------------------------------
//  ||  Navatigation Guards definition
//  \/  (Auth status, User role and Entrance finalization)
// --------------------------------------------------------------------------

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    console.log('NAV GUARD (ifAuthenticated)- User is Authenticated')
    next()
    return
  }
  console.log('NAV GUARD (ifAuthenticated)- User isn\'t Authenticated')
  next({ name: 'Login' })
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log('NAV GUARD (ifNotAuthenticated)- User is not Authenticated')
    next()
    return
  }
  console.log('NAV GUARD (ifNotAuthenticated)- User is Authenticated')
  next({ name: 'Dashboard' })
}

// --------------------------------------------------------------------------
//  ||  Routing definitions
//  \/
// --------------------------------------------------------------------------

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (to.matched.some(m => m.meta.disableScroll)) {

    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [

    /**************************
    *                         *
    *       P U B L I C       *
    *                         *
    **************************/

    { path: '*', redirect: { name: 'Landing' } },
    { path: '/', redirect: { name: 'Landing' } },
    {
      path: '/home',
      name: 'Landing',
      component: resolve => {
        require(['@/components/static/Landing.vue'], resolve)
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: resolve => {
            require(['@/components/entrance/Login.vue'], resolve)
          }
        },
        {
          path: 'signup',
          name: 'Signup',
          component: resolve => {
            require(['@/components/entrance/Signup.vue'], resolve)
          }
        }
      ],
      beforeEnter: ifNotAuthenticated
    },

    // /**************************
    // *                         *
    // *      P R I V A T E      *
    // *                         *
    // **************************/

    // Dashboard
    {
      path: '/welcome',
      name: 'Dashboard',
      component: resolve => {
        require(['@/components/dashboard/Dashboard.vue'], resolve)
      },
      beforeEnter: ifAuthenticated
    }

  ]
})
