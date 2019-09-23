<template>
  <main class="main u-max-width">
    <div class="u-width-60">
      <div class="u-center-text u-mb-medium">
          <h1 class="page-title">{{ pageTitle }}</h1>
      </div>

      <ErrMsg class="u-mb-medium" />

      <Card>
        <ListsList :lists="lists" />
        <infinite-loading @infinite="infiniteLoad"></infinite-loading>
      </Card>

    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import ListsList from '../components/ListsList'
import { fetchUserLists, fetchPublicLists } from '../lib/functions'

export default {
  props: {
    type: String
  },
  data() {
    return {
      lists: [],
      lastItem: null
    }
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    },
    listsType() {
      if(this.type === 'mylists') {
        return 'mylists'
      } else {
        return 'public'
      }
    },
    pageTitle() {
      if(this.listsType === 'mylists') {
        return 'マイリスト'
      } else {
        return 'リスト一覧'
      }
    }
  },
  components: {
    Card,
    ErrMsg,
    ListsList
  },
  methods: {
    async infiniteLoad($state) {
      try {
        let results
        if(this.listsType === 'mylists') {
          results = await fetchUserLists(30, this.loginUser.id, this.lastItem)
        } else {
          results = await fetchPublicLists(30, this.lastItem)
        }

        if(results.items.length > 0) { // 読み込むデータがまだ存在する場合
          results.items.forEach(item => {
            this.lists.push(item)
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
