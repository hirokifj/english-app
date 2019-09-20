<template>
  <main class="main">
    <div class="u-max-width">

      <ErrMsg class="u-mb-medium" />

      <Card :white="true" color="blue" class="u-mb-medium">
        <template slot="header">
          <h1>ユーザー情報</h1>
        </template>
        <div class="profile-item">
          <span class="profile-item__title"><b>メールアドレス：</b>{{ loginUser.email }}</span>
          <router-link :to="{ name: 'emailedit' }" class="link-text">メールアドレス変更</router-link>
        </div>
      </Card>

      <button class="btn btn--yellow" @click="signOut">
        ログアウト
      </button>
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
    }
  },
  methods: {
    async signOut() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // Firebaseからのログアウト
        await firebase.auth().signOut()
        // storeのログインユーザー情報をクリア
        this.$store.dispatch('user/clearLoginUser')

        this.$router.push({ name: 'signin' })
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
</style>
