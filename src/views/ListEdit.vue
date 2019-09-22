<template>
  <main class="main u-max-width">
    <div class="u-width-40">
      <div class="u-center-text u-mb-medium">
        <h1 class="page-title u-mb-small">リスト編集</h1>
        <span v-if="currentTitle">「{{ currentTitle }}」の編集</span>
      </div>

      <ErrMsg class="u-mb-medium" />

      <form class="form">
        <div class="form__group">
          <label for="list-title" class="form__label">
            <span class="label-text">リストタイトル</span>
            <span class="form__required-badge">必須</span>
          </label>
          <input id="list-title" type="text" class="form__input" v-model="title">
        </div>
        <div class="form__group form-radio-wrap">
          <div class="form__radio-group">
            <input type="radio" id="public" class="form__radio" :value="true" v-model="isPublic">
            <label for="public" class="form__label-radio">公開</label>
          </div>
          <div class="form__radio-group">
            <input type="radio" id="private" class="form__radio" :value="false" v-model="isPublic">
            <label for="private" class="form__label-radio">非公開</label>
          </div>
        </div>
        <div class="form__btn u-center-text">
          <button class="btn btn--big btn--green">
            更新
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import ErrMsg from '../components/ErrMsg'
import { fetchListById } from '../lib/functions'

export default {
  props: {
    id: String
  },
  data() {
    return {
      currentTitle: '',
      title: '',
      isPublic: true
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
  watch: {
    id: {
      async handler() {
        try {
          // リスト情報を取得
          const listData = await fetchListById(this.id)

          if(listData && this.loginUser.id === listData.userId) {
            this.currentTitle = listData.title
            this.title = listData.title
            this.isPublic = listData.isPublic
          } else {
            // リストデータがないか、所有者でない場合は、ダッシュボードへリダイレクトする。
            this.$router.push({ name: 'dashboard' })
          }
        } catch(error) {
          // エラー時もダッシュボードへリダイレクト
          this.$router.push({ name: 'dashboard' })
        }
      },
      immediate: true
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
