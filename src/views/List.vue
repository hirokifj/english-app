<template>
  <main class="main u-max-width">
    <div class="u-width-60">
      <div class="u-center-text u-mb-medium">
        <h1 v-if="list" class="page-title">{{ list.title }}</h1>
      </div>
      <transition mode="out-in">
        <div v-if="isLearning" key="learning">

          <LearningCard v-if="hasSentences" :learningSentences="listSentences" @stop="stopLearning" />

        </div>
        <div v-else key="detail">
          <div class="list-menu u-mb-medium">
            <button v-if="hasSentences" class="btn btn--blue" @click="startLearning">覚える</button>

            <LikeIcon v-if="loginUser" :listId="id" :userId="loginUser.id" />

          </div>
          <div v-if="isOwner" class="user-menu u-mb-medium">
            <router-link :to="{ name: 'listsSelect', params: id }" class="link-text">例文を選択</router-link>
            <router-link :to="{ name: 'listsEdit', params: id }" class="link-text">編集</router-link>
          </div>

          <Card color="yellow" class="u-mb-big">
            <template slot="header">
              <h2>リストの例文</h2>
            </template>
            <SentencesList :sentences="listSentences" />
          </Card>

          <ErrMsg class="u-mb-medium" />

          <div v-if="isOwner" class="u-center-text">
            <button class="btn btn--pink" @click="deleteList">リスト削除</button>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>

<script>
import Card from '../components/Card'
import ErrMsg from '../components/ErrMsg'
import SentencesList from '../components/SentencesList'
import LearningCard from '../components/LearningCard'
import LikeIcon from '../components/LikeIcon'
import firebase from 'firebase'
import { fetchListById, fetchSentenceById } from '../lib/functions'

export default {
  props: {
    id: String
  },
  data() {
    return {
      list: null,
      listSentences: [],
      isLearning: false, // 学習画面の表示管理
      isProcessingDelete: false // リスト削除処理中の管理フラグ
    }
  },
  components: {
    Card,
    ErrMsg,
    SentencesList,
    LearningCard,
    LikeIcon
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
    },
    hasSentences() {
      return this.listSentences.length > 0
    }
  },
  methods: {
    async deleteList() {
      // 連続クリック対策。処理中の場合は処理を抜ける。
      if(this.isProcessingDelete) {
        return
      }

      // 削除の意思確認
      const result = await this.$swal({
        title: 'リストを削除してよろしいですか？',
        type: 'warning',
        showCancelButton: true
      })

      // 削除確認が取れた場合に実行
      if(result.value === true) {
        // エラーメッセージ初期化
        this.$store.dispatch('error/clearError')

        try {
          // 処理中フラグを立てる。
          this.isProcessingDelete = true

          // 当該リストに紐付く、likesコレクションのドキュメントIDを全て取得
          const likesSnapshot = await firebase.firestore().collection('likes').where('listId', '==', this.id).get()
          const deleteLikesIds = likesSnapshot.docs.map(doc => doc.id)

          // likesドキュメントを削除
          if(deleteLikesIds.length > 0) {
            const deleteLikesPromises = deleteLikesIds.map(likeId => {
              return new Promise((resolve, reject) => {
                firebase.firestore().collection('likes').doc(likeId).delete()
                  .then(() => {
                    resolve(true)
                  })
                  .catch((err) => {
                    reject(err)
                  })
              })
            })

            await Promise.all(deleteLikesPromises)
          }

          // リストの削除
          await firebase.firestore().collection('lists').doc(this.id).delete()
          this.$router.push({ name: 'dashboard' })
        } catch(error) {
          this.$store.dispatch('error/setError', error)
          this.isProcessingDelete = false
        }
      }
    },
    startLearning() {
      this.isLearning = true
    },
    stopLearning() {
      this.isLearning = false
    },
    canShow(listData) {
      // 公開状態のものが閲覧可能。非公開の場合は、作成者自身のみ閲覧可能。
      return listData.isPublic === true || (this.loginUser && this.loginUser.id === listData.userId)
    }
  },
  watch: {
    id: {
      async handler() {
        try {
          // リスト情報を取得
          const listData = await fetchListById(this.id)

          if(listData && this.canShow(listData)) {
            this.list = listData
          } else {
            // リストデータがない、閲覧不可の場合は、ダッシュボードへリダイレクトする。
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
          const sentence = await fetchSentenceById(sentenceId)
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

.list-menu {
  display: flex;
  align-items: center;
  justify-content: center;

  & .btn:not(:last-child) {
    margin-right: 4rem;
  }
}

.user-menu {
  display: flex;
  justify-content: center;
  align-items: center;

  & a:not(:last-child) {
    margin-right: 2rem;
  }
}

// リストの詳細表示、例文学習画面の切り替え
.v-enter-active, .v-leave-active {
  transition: opacity .4s, transform .6s;
}

.v-enter {
  opacity: 0;
  transform: translateY(-15px)
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-15px)
}
</style>
