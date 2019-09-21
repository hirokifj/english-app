<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-60">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title u-mb-small">例文選択</h1>
          <span v-if="list" class="list-title">「{{ list.title }}」の例文を選択</span>
        </div>

        <ErrMsg class="u-mb-medium" />

        <div class="list-menu u-mb-big u-center-text">
          <button class="btn btn--blue btn--big">保存</button>
        </div>

        <Card color="green">
          <template slot="header">
            <h2>選択中の例文</h2>
          </template>
          <SentencesList :sentences="selectedSentences" />
        </Card>

        <Card color="yellow">
          <template slot="header">
            <h2>例文一覧</h2>
          </template>
          <SentencesList :sentences="unselectedSentences" />
          <infinite-loading @infinite="infiniteLoad"></infinite-loading>
        </Card>

      </div>
    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import SentencesList from '../components/SentencesList'
import { fetchUserSentences, fetchListById, getSentenceById } from '../lib/functions'
import _ from 'lodash'

export default {
  props: {
    id: String
  },
  data() {
    return {
      list: null,
      selectedSentences: [],
      userSentences: [],
      lastItem: null
    }
  },
  components: {
    Card,
    ErrMsg,
    SentencesList
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    },
    slectedSentenceIds() {
      // 選択中例文のIDのみを返す
      return _.map(this.selectedSentences, 'id')
    },
    unselectedSentences() {
      // 未選択の例文のみを返す
      return this.userSentences.filter(sentence => this.slectedSentenceIds.indexOf(sentence.id) === -1)
    }
  },
  methods: {
    async infiniteLoad($state) {
      try {
        // ログインユーザーの例文を取得
        const results = await fetchUserSentences(30, this.loginUser.id, this.lastItem)

        if(results.items.length > 0) { // 読み込むデータがまだ存在する場合
          results.items.forEach(item => {
            this.userSentences.push(item)
          })
          this.lastItem = results.lastItem

          $state.loaded()
        } else {
          $state.complete()
        }
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
    }
  },
  watch: {
    id: {
      async handler() {
        try {
          // リスト情報を取得
          const listData = await fetchListById(this.id)

          if(listData && this.loginUser.id === listData.userId) {
            this.list = listData
          } else {
            // リストデータがない、かつ自身の作成データでない場合は、ダッシュボードへリダイレクトする。
            this.$router.push({ name: 'dashboard' })
          }
        } catch(error) {
          // エラー時もダッシュボードへリダイレクト
          this.$router.push({ name: 'dashboard' })
        }
      },
      immediate: true
    },
    list: async function() {
      try {
        // 選択されている例文のデータを取得
        this.list.sentences.forEach(async sentenceId => {
          const sentence = await getSentenceById(sentenceId)
          if(sentence) { // 例文データがある場合のみdataに格納する。
            this.selectedSentences.push(sentence)
          }
        })
      } catch(error) {
        this.$store.dispatch('error/setError', error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 0 6rem 0;
}
.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;
}
</style>
