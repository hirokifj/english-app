<template>
  <main class="main">
    <div class="u-max-width">

      <Card :class="'u-width-40'" color="pink" :white="true">
        <template slot="header">
          <div class="u-center-text">
            <h1>パスワード再設定</h1>
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
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--pink">
              メール送信
            </button>
          </div>
        </form>
        <div class="msg msg--success" v-if="isDone">
          <p>パスワード再設定メールを送信しました。</p>
        </div>
        <div class="msg" v-else>
          <p>パスワード再設定メールを送信します。</p>
        </div>
      </Card>

    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'

export default {
  data() {
    return {
      email: '',
      isDone: false
    }
  },
  components: {
    Card,
    ErrMsg
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 8rem 0 12rem 0;
  background-color: $color-bg-grey;
}
.msg {
  color: $color-grey-dark-1;
  font-size: 16px;
  text-align: center;

  &--success {
    color: $color-green;
  }
}
</style>
