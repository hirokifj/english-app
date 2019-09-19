import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'
import store from './store/'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      meta: { requireAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    firebase.auth().onAuthStateChanged(async user => {
      if(user) {
        // ユーザーデータ取得
        store.dispatch('user/setLoginUser', {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified
        })

        next()
      } else {
        next({ name: 'signin' })
      }
    })
  } else {
    next()
  }
})

export default router
