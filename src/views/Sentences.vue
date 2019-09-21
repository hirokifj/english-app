<template>
  <main class="main u-max-width">
    <div class="u-width-60">
      <div class="u-center-text u-mb-medium">
        <h1 class="page-title">例文一覧</h1>
      </div>

      <ErrMsg class="u-mb-medium" />

      <Card>
        <ul class="list">
          <li class="list__item" v-for="sentence in sentences" :key="sentence.id">
            <router-link class="list__link" :to="{ name: 'senetncesDetail', params: { id: sentence.id } }">
              <div class="sentence">
                <span class="sentence__en">{{ sentence.english }}</span>
                <span class="sentence__ja">{{ sentence.japanese }}</span>
              </div>
            </router-link>
          </li>
        </ul>
        <infinite-loading @infinite="infiniteLoad"></infinite-loading>
      </Card>

    </div>
  </main>
</template>

<script>
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

.list {
  list-style: none;
  &__item {
    min-height: 10rem;
    border: 2px solid $color-line-grey;
    transition: background-color .4s;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    &:hover {
      background-color: $color-grey-light-1;
    }
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2rem;

    &:link,
    &:visited {
      color: $color-dark;
      text-decoration: none;
    }
  }
}

.sentence {
  &__en {
    display: block;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__ja {
    font-size: 14px;
    color: $color-grey-dark-1;
  }
}
</style>
