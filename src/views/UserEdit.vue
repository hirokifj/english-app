<template>
  <main class="main">
    <div class="u-max-width">

      <ErrMsg class="u-mb-medium" />

      <button class="btn btn--yellow" @click="signOut">
        ログアウト
      </button>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import ErrMsg from '../components/ErrMsg'

export default {
  components: {
    ErrMsg
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
</style>
