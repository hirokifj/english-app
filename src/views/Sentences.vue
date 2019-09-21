<template>
  <main class="main u-max-width">
    <div class="u-width-60">
      <div class="u-center-text u-mb-medium">
        <h1 class="page-title">例文一覧</h1>
      </div>

      <ErrMsg class="u-mb-medium" />

      <Card>
        <SentencesList :sentences="sentences" />
        <infinite-loading @infinite="infiniteLoad"></infinite-loading>
      </Card>

    </div>
  </main>
</template>

<script>
import SentencesList from '../components/SentencesList'
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import { fetchUserSentences } from '../lib/functions'

export default {
  data() {
    return {
      sentences: [],
      lastItem: null
    }
  },
  components: {
    SentencesList,
    Card,
    ErrMsg
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    }
  },
  methods: {
    async infiniteLoad($state) {
      try {
        const results = await fetchUserSentences(30, this.loginUser.id, this.lastItem)

        if(results.items.length > 0) { // 読み込むデータがまだ存在する場合
          results.items.forEach(item => {
            this.sentences.push(item)
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
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 0;
}

.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;
}
</style>
