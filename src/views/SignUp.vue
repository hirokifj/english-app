<template>
  <main class="main">
    <div class="u-max-width">

      <Card :class="'u-width-40'" color="yellow" :white="true">
        <template slot="header">
          <div class="u-center-text">
            <h1>ユーザー登録</h1>
          </div>
        </template>

        <ErrMsg class="u-mb-medium" />

        <form class="form">
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
            <button class="btn btn--big btn--yellow" @click.prevent="signUp">
              登録
            </button>
          </div>
        </form>
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
    async signUp() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      // 登録処理
      try {
        await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
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
