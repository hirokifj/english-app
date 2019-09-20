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
            <button class="btn btn--big btn--pink">
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
