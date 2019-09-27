<template>
    <div>
      <font-awesome-icon class="like-icon" :icon="iconType" @click="likeList"/>
    </div>
</template>

<script>
import firebase from 'firebase'
import { fetchLikeId } from '../lib/functions'

export default {
  props: {
    listId: String,
    userId: String
  },
  data() {
    return {
      likeId: '',
      isProcessing: false
    }
  },
  computed: {
    iconType() {
      if(this.likeId) {
        return ['fas', 'heart']
      } else {
        return ['far', 'heart']
      }
    }
  },
  methods: {
    async likeList() {
      // 連続クリック対策。処理中の場合は処理を抜ける。
      if(this.isProcessing) {
        return
      }

      // エラーメッセージ初期化
      this.$store.dispatch('error/clearError')

      // like処理
      try {
        // 処理中フラグを立てる。
        this.isProcessing = true

        // like済みの場合
        if(this.likeId) {
          await firebase.firestore().collection('likes').doc(this.likeId).delete()
          this.likeId = ''

        // まだlikeされていない場合
        } else {
          const like = await firebase.firestore().collection('likes').add({
            userId: this.userId,
            listId: this.listId,
            createdAt: new Date()
          })
          this.likeId = like.id
        }

        this.isProcessing = false
      } catch(error) {
        this.$store.dispatch('error/setError', error)
        this.isProcessing = false
      }
    }
  },
  watch: {
    listId: {
      async handler() {
        try {
          // コレクションからlike済みか検索する。
          this.likeId = await fetchLikeId(this.userId, this.listId)

        } catch(error) {
          this.$store.dispatch('error/setError', error)
        }
      },
      immediate: true
    },
  }

}
</script>

<style lang="scss" scoped>
.like-icon {
  color: $color-pink;
  font-size: 3.2rem;
  vertical-align: bottom;
  cursor: pointer;
}
</style>
