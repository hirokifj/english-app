<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">退会</h1>
        </div>

        <ErrMsg class="u-mb-medium" />

        <form class="form">
          <div class="form__group">
            <label for="password" class="form__label">
              <span class="label-text">パスワード</span>
            </label>
            <input id="password" type="password" class="form__input" v-model="password">
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--pink">
              退会
            </button>
          </div>
        </form>
        <div class="msg u-center-text">
          <p v-if="isProcessing">退会処理を行なっています。</p>
          <p v-if="!isProcessing">退会すると、登録した全てのデータが削除されます。退会完了後、画面が切り替わります。</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ErrMsg from '../components/ErrMsg'

export default {
  data() {
    return {
      password: '',
      isProcessing: false
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
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 0 40rem 0;
}

.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;
  color: $color-pink;
}

.msg {
  color: $color-pink;
}
</style>
