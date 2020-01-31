<template>
  <main class="main">
    <div class="u-max-width">

      <Card class="u-width-40" color="green" :white="true">
        <template slot="header">
          <div class="u-center-text">
            <h1>ログイン</h1>
          </div>
        </template>

        <ErrMsg class="u-mb-medium" />

        <form class="form u-mb-medium">
          <div class="form__group">
            <label for="email" class="form__label">
              <span class="label-text">メールアドレス</span>
            </label>
            <input id="email" type="email" class="form__input" v-model="email">
          </div>
          <div class="form__group">
            <label for="password" class="form__label">
              <span class="label-text">パスワード</span>
            </label>
            <input id="password" type="password" class="form__input" v-model="password">
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--green" @click.prevent="signIn">
              ログイン
            </button>
          </div>
        </form>
        <div class="link u-center-text">
          <router-link :to="{ name: 'reset' }" class="link-text">パスワードを忘れた方はこちら</router-link>
        </div>
      </Card>

    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import firebase from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Card,
    ErrMsg
  },
  methods: {
    async signIn() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      // ログイン
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$router.push({ name: 'dashboard' })
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 8rem 0 12rem 0;
  background-color: $color-bg-grey;
}
</style>
