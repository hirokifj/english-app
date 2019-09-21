<template>
  <main class="main u-max-width">
    <div class="u-width-60">

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

      <router-link class="btn btn--yellow" :to="{ name: 'senetncesEdit', params: { id: id } }">編集</router-link>
    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
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
    Card
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
</style>
