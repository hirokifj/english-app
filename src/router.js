import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lists from './views/Lists.vue'
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
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/SignIn.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import(/* webpackChunkName: "reset" */ './views/PasswordReset.vue')
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import(/* webpackChunkName: "withdrawal" */ './views/Withdrawal.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/user/edit',
      name: 'useredit',
      component: () => import(/* webpackChunkName: "useredit" */ './views/UserEdit.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/user/edit/email',
      name: 'emailedit',
      component: () => import(/* webpackChunkName: "emailedit" */ './views/EmailEdit.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/user/edit/password',
      name: 'passedit',
      component: () => import(/* webpackChunkName: "passedit" */ './views/PasswordEdit.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/sentences/create',
      name: 'senetncesCreate',
      component: () => import(/* webpackChunkName: "create-sentence" */ './views/SentenceCreate.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/sentences/:id/edit',
      name: 'senetncesEdit',
      props: true,
      component: () => import(/* webpackChunkName: "edit-sentence" */ './views/SentenceEdit.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/sentences/:id',
      name: 'senetncesDetail',
      props: true,
      component: () => import(/* webpackChunkName: "detail-sentence" */ './views/Sentence.vue')
    },
    {
      path: '/sentences/',
      name: 'senetncesList',
      props: true,
      component: () => import(/* webpackChunkName: "list-sentence" */ './views/Sentences.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/lists/mylist',
      name: 'myList',
      props: { type: 'mylists' },
      component: Lists,
      meta: { requireAuth: true }
    },
    {
      path: '/lists/like',
      name: 'likeList',
      props: { type: 'likeLists' },
      component: Lists,
      meta: { requireAuth: true }
    },
    {
      path: '/lists/ranking',
      name: 'ranking',
      props: { type: 'ranking' },
      component: Lists
    },
    {
      path: '/lists/create',
      name: 'listsCreate',
      component: () => import(/* webpackChunkName: "create-list" */ './views/ListCreate.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/lists/:id/select',
      name: 'listsSelect',
      props: true,
      component: () => import(/* webpackChunkName: "select-list" */ './views/SelectSentence.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/lists/:id/edit',
      name: 'listsEdit',
      props: true,
      component: () => import(/* webpackChunkName: "edit-list" */ './views/ListEdit.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/lists/:id',
      name: 'listsDetail',
      props: true,
      component: () => import(/* webpackChunkName: "detail-list" */ './views/List.vue')
    },
    {
      path: '/lists/',
      name: 'listsList',
      component: Lists
    },
  ],
  // ページ遷移持、スクロール位置をページ上部に戻す。
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) { // ブラウザバック時は、元のスクロール位置を維持する
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // ページ遷移前にエラーメッセージをクリア
  store.dispatch('error/clearError')

  // ユーザーの認証チェック
  if(to.matched.some(record => record.meta.requireAuth)) {
    firebase.auth().onAuthStateChanged(user => {
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
        // storeのログインユーザー情報をクリア
        store.dispatch('user/clearLoginUser')

        next({ name: 'signin' })
      }
    })
  } else {
    next()
  }
})

export default router
