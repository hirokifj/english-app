<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">リスト作成</h1>
        </div>
        <form class="form">
          <div class="form__group">
            <label for="list-title" class="form__label">
              <span class="label-text">リストタイトル</span>
            </label>
            <input id="list-title" type="text" class="form__input" v-model="title">
          </div>
          <div class="form__group form-radio-wrap">
            <div class="form__radio-group">
              <input type="radio" id="public" class="form__radio" value="true" v-model="isPublic">
              <label for="public" class="form__label-radio">公開</label>
            </div>
            <div class="form__radio-group">
              <input type="radio" id="private" class="form__radio" value="false" v-model="isPublic">
              <label for="private" class="form__label-radio">非公開</label>
            </div>
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--yellow">
              作成
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
      title: '',
      isPublic: true
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 0 32rem 0;
  @include respond(phone){
    padding: 6rem 0 18rem 0;
  }
}
.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;
}
</style>
