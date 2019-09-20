<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">パスワード変更</h1>
        </div>

        <ErrMsg class="u-mb-medium" />

        <form class="form">
          <div class="form__group">
            <label for="password" class="form__label">
              <span class="label-text">現在のパスワード</span>
            </label>
            <input id="password" type="password" class="form__input" v-model="password">
          </div>
          <div class="form__group">
            <label for="new-password" class="form__label">
              <span class="label-text">新しいパスワード</span>
            </label>
            <input id="new-password" type="password" class="form__input" v-model="newPassword">
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--pink" @click.prevent="updatePass">
              変更
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import ErrMsg from '../components/ErrMsg'
import firebase from 'firebase'
import { reAuth } from '../lib/functions'

export default {
  data() {
    return {
      password: '',
      newPassword: ''
    }
  },
  components: {
    ErrMsg
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    }
  },
  methods: {
    async updatePass() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // ユーザー情報を取得
        const user = firebase.auth().currentUser
        // 再認証処理
        await reAuth(user, this.loginUser.email, this.password)

        // パスワード変更
        await user.updatePassword(this.newPassword)
        this.$router.push({ name: 'useredit' })
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 0 40rem 0;
}
.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;

}
</style>
