<template>
  <main class="main u-max-width">
    <div class="u-width-60">
      <div class="u-center-text u-mb-medium">
          <h1 v-if="list" class="page-title">{{ list.title }}</h1>
      </div>
      <div v-if="isOwner" class="user-menu u-mb-medium">
        <router-link :to="{ name: 'listsSelect', params: id }" class="link-text">例文を選択</router-link>
        <router-link :to="{ name: 'listsEdit', params: id }" class="link-text">編集</router-link>
      </div>

      <Card color="yellow">
        <template slot="header">
          <h2>リストの例文</h2>
        </template>
        <SentencesList :sentences="listSentences" />
      </Card>

    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import SentencesList from '../components/SentencesList'
import { fetchListById, getSentenceById } from '../lib/functions'

export default {
  props: {
    id: String
  },
  data() {
    return {
      list: null,
      listSentences: []
    }
  },
  components: {
    Card,
    SentencesList
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    },
    isOwner() {
      if(this.loginUser && this.list) {
        return this.loginUser.id === this.list.userId
      } else {
        return false
      }
    }
  },
  watch: {
    id: {
      async handler() {
        try {
          // リスト情報を取得
          const listData = await fetchListById(this.id)

          if(listData) {
            this.list = listData
          } else {
            // リストデータがない場合は、ダッシュボードへリダイレクトする。
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
            this.listSentences.push(sentence)
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
  padding: 6rem 0 20rem 0;
  @include respond(phone){
    padding: 6rem 0 10rem 0;
  }
}

.page-title {
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 1px;
}

.user-menu {
  display: flex;
  justify-content: center;
  align-items: center;

  & a:not(:last-child) {
    margin-right: 2rem;
  }
}
</style>
