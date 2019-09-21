<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">例文編集</h1>
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
            <button class="btn btn--big btn--green" @click.prevent="update">
              更新
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
import { getSentenceById } from '../lib/functions'

export default {
  props: {
    id: String
  },
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
    async update() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // 例文の更新
        await firebase.firestore().collection('sentences').doc(this.id).update({
          english: this.english,
          japanese: this.japanese
        })
        // 詳細ページへリダイレクト
        this.$router.push({ name: 'senetncesDetail', params: { id: this.id } })
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
    }
  },
  watch: {
    id: {
      async handler() {
        try {
          //例文情報を取得
          const sentenceData = await getSentenceById(this.id)

          if(sentenceData && this.loginUser.id === sentenceData.userId) {
            this.english = sentenceData.english
            this.japanese = sentenceData.japanese
          } else {
            // 例文データがない、かつ自身の作成データでない場合は、ダッシュボードへリダイレクトする。
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
