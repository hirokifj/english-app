<template>
  <main class="main">
    <div class="u-max-width">

      <ErrMsg class="u-mb-medium" />

      <Card :white="true" color="blue" class="u-mb-medium">
        <template slot="header">
          <h1>ユーザー情報</h1>
        </template>
        <div class="profile-item">
          <span class="profile-item__title"><b>メールアドレス：</b>{{ email }}</span>
          <router-link :to="{ name: 'emailedit' }" class="link-text">メールアドレス変更</router-link>
        </div>
      </Card>

      <div class="btn-group">
        <button class="btn btn--yellow" @click="signOut">
          ログアウト
        </button>
        <router-link :to="{ name: 'passedit' }" class="btn btn--green">パスワード変更</router-link>
        <router-link :to="{ name: 'withdrawal' }" class="btn btn--pink">退会</router-link>
      </div>

    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'

export default {
  components: {
    ErrMsg,
    Card
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    },
    email() {
      if(this.loginUser) {
        return this.loginUser.email
      } else {
        return ''
      }
    }
  },
  methods: {
    async signOut() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // Firebaseからのログアウト。ログアウト完了後、onAuthStateChangedによりリダイレクト。
        await firebase.auth().signOut()
        // storeのログインユーザー情報をクリア
        this.$store.dispatch('user/clearLoginUser')
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 8rem 0 50rem 0;
  background-color: $color-bg-grey;
}
.profile-item {
  &__title {
    display: block;
    margin-bottom: 1rem;
  }
}
.btn-group {
  display: flex;
  flex-wrap: wrap;

  & .btn {
    margin-bottom: 2rem;
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
