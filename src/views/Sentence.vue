<template>
  <main class="main u-max-width">
    <div class="u-width-60">

      <ErrMsg class="u-mb-medium" />

      <Card color="green" class="u-mb-medium">
        <template slot="header">
          <div class="u-center-text">
            <h1>例文情報</h1>
          </div>
        </template>
        <dl v-if="sentence" class="sentence-info">
          <div class="sentence-info__item">
            <dt>英文</dt>
            <dd v-if="sentence.english">{{ sentence.english }}</dd>
          </div>
          <div class="sentence-info__item">
            <dt>日本語訳</dt>
            <dd v-if="sentence.japanese">{{ sentence.japanese }}</dd>
          </div>
        </dl>
      </Card>

      <div v-if="canEdit" class="btn-group">
        <router-link class="btn btn--yellow" :to="{ name: 'senetncesEdit', params: { id: id } }">編集</router-link>
        <button class="btn btn--pink" @click="deleteItem">削除</button>
      </div>
    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import firebase from 'firebase'
import { getSentenceById } from '../lib/functions'

export default {
  props: {
    id: String
  },
  data() {
    return {
      sentence: null
    }
  },
  components: {
    Card,
    ErrMsg
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    },
    canEdit() {
      return this.loginUser.id === this.sentence.userId
    }
  },
  methods: {
    async deleteItem() {
      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // 例文の削除
        await firebase.firestore().collection('sentences').doc(this.id).delete()
        this.$router.push({ name: 'dashboard' })
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

          if(sentenceData) {
            this.sentence = sentenceData
          } else {
            // 例文データがない場合は、ダッシュボードへリダイレクトする。
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
  padding: 6rem 0 20rem 0;
  @include respond(phone){
    padding: 6rem 0 10rem 0;
  }
}

.sentence-info {
  &__item {
    &:not(:last-child) {
      margin-bottom: 2.4rem;
    }
  }

  & dt {
    font-size: 14px;
    font-weight: bold;
  }
}

.btn-group {
  display: flex;
  flex-wrap: wrap;

  @include respond(phone) {
    justify-content: center;
  }

  & .btn {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
