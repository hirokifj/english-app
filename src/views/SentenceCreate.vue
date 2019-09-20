<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">例文登録</h1>
        </div>

        <ErrMsg class="u-mb-medium" />

        <form class="form">
          <div class="form__group">
            <label for="en" class="form__label">
              <span class="label-text">英文</span>
            </label>
            <input id="en" type="text" class="form__input" v-model="english">
          </div>
          <div class="form__group">
            <label for="ja" class="form__label">
              <span class="label-text">日本語訳</span>
            </label>
            <input id="ja" type="text" class="form__input" v-model="japanese">
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--green" @click.prevent="create">
              登録
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

export default {
  data() {
    return {
      english: '',
      japanese: ''
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
    async create() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // 例文の登録
        const sentence = await firebase.firestore().collection('sentences').add({
          userId: this.loginUser.id,
          english: this.english,
          japanese: this.japanese,
          createdAt: new Date()
        })
        // todo: 詳細ページへリダイレクト
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
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
