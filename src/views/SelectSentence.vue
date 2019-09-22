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
        <div class="select-tab u-mb-medium">
          <button class="select-tab__btn" @click="showSelected = true" :class="{ active: showSelected }">選択中の例文</button>
          <button class="select-tab__btn" @click="showSelected = false" :class="{ active: !showSelected }">例文一覧</button>
        </div>

        <transition mode="out-in">
          <Card v-if="showSelected" key="selcted" color="green">
            <template slot="header">
              <h2>選択中の例文</h2>
            </template>
            <SentencesList :sentences="selectedSentences" :selectable="true" type="remove" />
          </Card>
          <Card v-else key="unselected" color="yellow">
            <template slot="header">
              <h2>例文一覧</h2>
            </template>
            <SentencesList :sentences="unselectedSentences" :selectable="true" type="add" />
            <infinite-loading @infinite="infiniteLoad"></infinite-loading>
          </Card>
        </transition>
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
      lastItem: null,
      showSelected: true, // タブの切り替え管理
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
  padding: 6rem 0 16rem 0;
}

.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;
}

.select-tab {
  display: flex;
  align-items: center;
  border-radius: 5px;

  &__btn {
    flex: 0 0 50%;
    font-size: 16px;
    padding: 2rem 0;
    border: 1px solid $color-line-grey;
    color: $color-grey-dark-1;
    background-color: $color-white;
    outline: none;
    cursor: pointer;
    @include respond(phone) {
      padding: 1rem 0;
    }

    &:first-child {
      border-radius: 5px 0 0 5px;
      &.active {
        background-color: $color-green;
      }
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
      &.active {
        background-color: $color-yellow;
      }
    }

    &.active {
      color: $color-white;
    }
  }
}

.v-enter-active, .v-leave-active {
  transition: opacity .4s, transform .4s;
}

.v-enter {
  opacity: .2;
  transform: translateX(-10px)
}

.v-leave-to {
  opacity: 0;
  transform: translateX(10px)
}
</style>
