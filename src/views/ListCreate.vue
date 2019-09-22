<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">リスト作成</h1>
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
              <input type="radio" id="public" class="form__radio" value="true" v-model="isPublic">
              <label for="public" class="form__label-radio">公開</label>
            </div>
            <div class="form__radio-group">
              <input type="radio" id="private" class="form__radio" value="false" v-model="isPublic">
              <label for="private" class="form__label-radio">非公開</label>
            </div>
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--yellow" @click.prevent="create">
              作成
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
  methods: {
    async create() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      if(this.validateList()) {
        try {
          // リストの作成
          const list = await firebase.firestore().collection('lists').add({
            userId: this.loginUser.id,
            title: this.title,
            isPublic: this.isPublic,
            likeCount: 0,
            sentences: [],
            createdAt: new Date()
          })
          // 例文選択画面へリダイレクト
          this.$router.push({ name: 'listsSelect', params: { id: list.id } })
        } catch(error) {
          this.$store.dispatch('error/setError', error)
        }
      }
    },
    validateList() {
      // タイトル入力チェック
      if(this.title === '') {
        // Firebase標準のエラー情報に合わせたオブジェクトをstoreに渡す
        this.$store.dispatch('error/setError', {
          code: 'required-title-field',
          message: 'title field is required'
        })
        return false
      }
      // 公開フラグチェック
      if(typeof this.isPublic !== 'boolean') {
        this.$store.dispatch('error/setError', {
          code: 'invalid-public-field',
          message: 'public field is not boolean'
        })
        return false
      }

      return true
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
