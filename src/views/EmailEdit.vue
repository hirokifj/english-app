<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">メールアドレス変更</h1>
        </div>
        <form class="form">
          <div class="form__group">
            <label for="new-email" class="form__label">
              <span class="label-text">新しいメールアドレス</span>
            </label>
            <input id="new-email" type="email" class="form__input" v-model="newEmail">
          </div>
          <div class="form__group">
            <label for="password" class="form__label">
              <span class="label-text">パスワード</span>
            </label>
            <input id="password" type="password" class="form__input" v-model="password">
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
export default {
  data() {
    return {
      password: '',
      newEmail: ''
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
