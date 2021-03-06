<template>
  <main class="main">
    <div class="u-max-width">
      <div class="u-width-40">
        <div class="u-center-text u-mb-medium">
          <h1 class="page-title">退会</h1>
        </div>

        <ErrMsg class="u-mb-medium" />

        <form class="form">
          <div class="form__group">
            <label for="password" class="form__label">
              <span class="label-text">パスワード</span>
            </label>
            <input id="password" type="password" class="form__input" v-model="password">
          </div>
          <div class="form__btn u-center-text">
            <button class="btn btn--big btn--pink" @click.prevent="deleteUserDatas">
              退会
            </button>
          </div>
        </form>
        <div class="msg u-center-text">
          <p v-if="isProcessing">退会処理を行なっています。</p>
          <p v-if="!isProcessing">退会すると、登録した全てのデータが削除されます。退会完了後、画面が切り替わります。</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ErrMsg from '../components/ErrMsg'
import firebase from 'firebase'
import { reAuth, fetchUserSentences, fetchUserLists, fetchUserLikes } from '../lib/functions'

export default {
  data() {
    return {
      password: '',
      isProcessing: false
    }
  },
  components: {
    ErrMsg
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    }
  },
  methods: {
    async deleteUserDatas() {
      // 連続クリック対策。処理中の場合は処理を抜ける。
      if(this.isProcessing) {
        return
      }

      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      try {
        // 処理中フラグを立てる。
        this.isProcessing = true

        // ユーザー情報を取得
        const user = firebase.auth().currentUser
        // 再認証処理
        await reAuth(user, this.loginUser.email, this.password)

        // 退会処理開始

        // ユーザーに紐付くデータを取得
        const userSentences = await fetchUserSentences('all', this.loginUser.id)
        const userLists = await fetchUserLists('all', this.loginUser.id)
        const userLikes = await fetchUserLikes('all', this.loginUser.id)

        // 削除処理を準備。
        // Promise.allで処理するため、削除処理を配列に格納する。
        let deleteUserDatasPromises = []

        // 例文の削除処理を配列に追加
        if(userSentences.items.length > 0) {
          userSentences.items.forEach(sentence => {
            const deleteSentencePromise  = new Promise((resolve, reject) => {
              firebase.firestore().collection('sentences').doc(sentence.id).delete()
                .then(() => {
                  resolve(true)
                })
                .catch((err) => {
                  reject(err)
                })
            })
            deleteUserDatasPromises.push(deleteSentencePromise)
          })
        }
        // リストの削除処理を配列に追加
        if(userLists.items.length > 0) {
          userLists.items.forEach(list => {
            const deleteListPromise  = new Promise((resolve, reject) => {
              firebase.firestore().collection('lists').doc(list.id).delete()
                .then(() => {
                  resolve(true)
                })
                .catch((err) => {
                  reject(err)
                })
            })
            deleteUserDatasPromises.push(deleteListPromise)
          })
        }
        // likeリストの削除処理を配列に追加
        if(userLikes.items.length > 0) {
          userLikes.items.forEach(like => {
            const deleteLikePromise  = new Promise((resolve, reject) => {
              firebase.firestore().collection('likes').doc(like.id).delete()
                .then(() => {
                  resolve(true)
                })
                .catch((err) => {
                  reject(err)
                })
            })
            deleteUserDatasPromises.push(deleteLikePromise)
          })
        }

        // ユーザーに紐付くデータの削除（削除対象が存在する場合）
        if(deleteUserDatasPromises.length > 0) {
          await Promise.all(deleteUserDatasPromises)
        }

        // ユーザーの削除。削除完了後、onAuthStateChangedによりリダイレクト。
        await user.delete()

        // storeのログインユーザー情報をクリア
        this.$store.dispatch('user/clearLoginUser')
        this.isProcessing = false
      } catch(error) {
        this.$store.dispatch('error/setError', error)
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 0 40rem 0;
}

.page-title {
  font-size: 3.2rem;
  letter-spacing: 1px;
  color: $color-pink;
}

.msg {
  color: $color-pink;
}
</style>
