<template>
  <main class="main">
    <div class="u-max-width">

      <Card :class="'u-width-40'" color="yellow" :white="true">
        <template slot="header">
          <div class="u-center-text">
            <h1>ユーザー登録</h1>
          </div>
        </template>
        <form class="form">
          <div class="form__group">
            <label for="email" class="form__label">
              <span class="label-text">メールアドレス</span>
            </label>
            <input id="email" type="text" class="form__input">
          </div>
          <div class="form__group">
            <label for="password" class="form__label">
              <span class="label-text">パスワード</span>
            </label>
            <input id="password" type="text" class="form__input">
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--yellow">
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

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Card,
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 8rem 0 12rem 0;
  background-color: $color-bg-grey;
}
</style>
