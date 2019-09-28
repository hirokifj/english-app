<template>
  <main class="main">
    <section class="header-catch">
      <div class="header-catch__content">
        <div class="header-catch__img">
          <img src="@/assets/top-img.png" alt="">
        </div>
        <div class="header-catch__body">
          <h2 class="header-copy u-mb-medium">
            <span class="header-copy__first">「例文」で覚える英語</span>
            <span class="header-copy__second">オリジナの例文集を作成して、楽しくボキャビル</span>
          </h2>
          <div class="header-catch__btns">
            <router-link :to="{ name: 'signin' }" class="btn btn--big btn--green">ログイン</router-link>
            <router-link :to="{ name: 'signup' }" class="btn btn--big btn--yellow">ユーザー登録</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section-lists u-mb-big">
      <div class="u-max-width">
        <div class="list-group">

          <Card color="pink" :white="true">
            <template slot="header">
              お気に入りランキング
            </template>
            <ListsList :lists="likeLists" class="u-mb-medium" />
            <div class="u-center-text">
              <router-link :to="{ name: 'ranking' }" class="btn btn--pink btn--big">もっと見る</router-link>
            </div>
          </Card>

          <Card color="yellow" :white="true">
            <template slot="header">
              みんなのリスト
            </template>
            <ListsList :lists="publicLists" class="u-mb-medium" />
            <div class="u-center-text">
              <router-link :to="{ name: 'listsList' }" class="btn btn--yellow btn--big">もっと見る</router-link>
            </div>
          </Card>

        </div>
      </div>
    </section>

    <section class="section-usage u-mb-big">
      <div class="u-center-text u-mb-medium">
          <h2 class="section-heading">
              <span class="section-heading__first">How to use</span>
              <span class="section-heading__second">使い方</span>
          </h2>
      </div>
      <div class="usage u-max-width">
        <div class="usage__item">
          <div class="usage__img">
            <img src="@/assets/sentence-img.png">
          </div>
          <div class="usage__body">
            <h3 class="usage__heading">英文と日本語訳をセットで登録</h3>
            <div class="usage__description">
              <p>海外ドラマ・映画を見てる時など、覚えたい英語表現を見つけたら、英語と日本語をセットで登録。</p>
              <p>単語だけを覚えるのではなく、「生きた英語の使い方」を学ぶことで、より効率的にボキャビルを進めることができます。</p>
            </div>
          </div>
        </div>
        <div class="usage__item">
          <div class="usage__img">
            <img src="@/assets/list-img.png">
          </div>
          <div class="usage__body">
            <h3 class="usage__heading">登録した例文を「リスト」にまとめる</h3>
            <div class="usage__description">
              <p>登録した例文は、「リスト（例文集）」としてまとめることができます。</p>
              <p>『〇〇のドラマに出てきた英語表現』『ビジネスの商談で使う英語表現』など、お好きなテーマで、オリジナルの例文集を作成できます。</p>
            </div>
          </div>
        </div>
        <div class="usage__item">
          <div class="usage__img">
            <img src="@/assets/learn-img.png">
          </div>
          <div class="usage__body">
            <h3 class="usage__heading">「リスト」で英語表現を覚える</h3>
            <div class="usage__description">
              <p>「リスト」に登録した例文は、暗記カードの要領で、１つずつ順番に確認していくことができます。</p>
              <p>一度登録した例文は、使い回し自由。手書きの暗記カードは、もう必要ありません。</p>
            </div>
          </div>
        </div>
        <div class="usage__item">
          <div class="usage__img">
            <img src="@/assets/share-img.png">
          </div>
          <div class="usage__body">
            <h3 class="usage__heading">作成した「リスト」をシェア</h3>
            <div class="usage__description">
              <p>他のユーザーが公開している「リスト」を使って、勉強することもできます。</p>
              <p>良さそうな「リスト」を見つけたら、お気に入り登録しておきましょう。お気に入り登録した「リスト」は、マイページからいつでもチェックできます。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Card from '../components/Card'
import ListsList from '../components/ListsList'
import { fetchPublicLists, fetchListsOrderByLike } from '../lib/functions'

export default {
  name: 'home',
  async created() {
    try {
      // お気に入りリスト取得
      const likeListsResults = await fetchListsOrderByLike(5)
      likeListsResults.items.forEach(item => {
        this.likeLists.push(item)
      })
      // ユーザーのリスト取得
      const listsResults = await fetchPublicLists(5)
      listsResults.items.forEach(item => {
        this.publicLists.push(item)
      })
    } catch(error) {
      this.$store.dispatch('error/setError', error)
    }
  },
  data() {
    return {
      likeLists: [],
      publicLists: []
    }
  },
  components: {
    Card,
    ListsList
  },
}
</script>

<style lang="scss" scoped>
// ヘッダーコピーセクション
.header-catch {
  height: 90vh;
  background-color: $color-blue-dark;
  position: relative;

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: $max-width;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    @include respond(tab-port) {
      display: block;
      text-align: center;
    }
  }

  &__img {
    flex: 0 0 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    @include respond(tab-port) {
      margin-bottom: 2rem;
    }

    & img {
      width: 50%;
      height: auto;
      @include respond(tab-port) {
        width: 30%;
      }
    }
  }

  &__body {
    flex: 0 0 60%;
  }

  &__btns {
    display: flex;
    align-items: center;
    @include respond(tab-land) {
      display: block;
    }
    @include respond(tab-port) {
      display: none;
    }

    & .btn:first-child {
      margin-right: 4rem;
      @include respond(tab-land) {
        margin-right: 2rem;
        margin-bottom: 2rem;
      }
    }
  }
}

.header-copy {
  color: $color-white;

  &__first {
    letter-spacing: 4px;
    font-size: 4.2rem;
    display: block;
    margin-bottom: 1rem;
    @include respond(phone) {
      font-size: 3.2rem;
      letter-spacing: 2px;
      line-height: 1.4;
      margin-bottom: 4rem;
    }
  }

  &__second {
    letter-spacing: 1px;

  }
}

// リスト一覧セクション
.section-lists {
  background-color: $color-bg-grey;
  padding: 10rem 0;
}

.list-group {
  display: flex;
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

// 使い方セクション
.section-heading {
  &__first {
    display: block;
    font-size: 4rem;
    font-weight: bold;
  }
}

.usage {

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    @include respond(tab-port) {
      display: block;
      text-align: center;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    &:not(:last-child) {
      margin-bottom: 8rem;
    }
  }

  &__img {
    flex: 0 0 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    @include respond(tab-port) {
      margin-bottom: 2rem;
    }

    & img {
      width: 40%;
      height: auto;
    }
  }

  &__body {
    flex: 0 0 50%;
    padding: 4rem 2rem;
  }

  &__heading {
    color: $color-blue;
    font-size: 2rem;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    @include respond(tab-port) {
      font-size: 2.4rem;
    }
  }

  &__description {
    font-size: 14px;

    & p:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
