<template>
  <main class="main">
    <div class="u-max-width">

      <ErrMsg class="u-mb-medium" />

      <div class="btn-group u-mb-big">
        <router-link :to="{ name: 'senetncesCreate' }" class="btn btn--green btn--small">例文登録</router-link>
        <router-link :to="{ name: 'listsCreate' }" class="btn btn--yellow btn--small">リスト作成</router-link>
      </div>
      <div class="card-group">

        <Card color="yellow" :white="true">
          <template slot="header">
            マイリスト
          </template>
          <ListsList :lists="lists" class="u-mb-medium" />
          <div class="u-center-text">
            <router-link :to="{ name: 'myList', params: { type: 'mylists' } }" class="btn btn--yellow btn--big">もっと見る</router-link>
          </div>
        </Card>

        <Card color="green" :white="true">
          <template slot="header">
            登録した例文
          </template>
          <SentencesList :sentences="sentences" class="u-mb-medium" />
          <div class="u-center-text">
            <router-link :to="{ name: 'senetncesList' }" class="btn btn--green btn--big">もっと見る</router-link>
          </div>
        </Card>
      </div>
    </div>
  </main>
</template>

<script>
import SentencesList from '../components/SentencesList'
import ListsList from '../components/ListsList'
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import { fetchUserSentences, fetchUserLists } from '../lib/functions'

export default {
  async created() {
    try {
      // ユーザーのリスト取得
      const listsResults = await fetchUserLists(5, this.loginUser.id)
      listsResults.items.forEach(item => {
        this.lists.push(item)
      })
      // 例文一覧の取得
      const sentencesResults = await fetchUserSentences(5, this.loginUser.id)
      sentencesResults.items.forEach(item => {
        this.sentences.push(item)
      })
    } catch(error) {
      this.$store.dispatch('error/setError', error)
    }
  },
  data() {
    return {
      lists: [],
      sentences: []
    }
  },
  components: {
    SentencesList,
    ListsList,
    Card,
    ErrMsg
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 8rem 0 12rem 0;
  background-color: $color-bg-grey;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  @include respond(tab-port) {
    display: block;
  }

  & .card {
    flex: 0 0 45%;
    margin-bottom: 6rem;
  }
}

.btn-group {
  @include respond(phone) {
    text-align: center;
  }

  & .btn:not(:last-child) {
    margin-right: 6rem;
    @include respond(phone) {
      margin-right: 2rem;
    }
  }
}
</style>
