<template>
  <div class="err" v-if="isError">
    <span class="err-msg">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    // storeに格納されたエラー情報を取得
    errInfo() {
      return this.$store.state.error.error
    },
    // storeにエラー情報が格納されている場合はtrue
    isError() {
      return this.errInfo
      // Object.keys(this.errInfo).length
    },
    errorMessage() {
      // エラーメッセージ
      let errMsg = ''
      // エラーがある場合は、内容に応じたメッセージを格納する
      if(this.isError) {
        switch(this.errInfo.code) {
          case 'auth/invalid-email':
            errMsg = 'メールアドレスを正しく入力してください。'
            break
          case 'auth/email-already-in-use':
            errMsg = 'このメールアドレスは既に利用されています。'
            break
          case 'auth/operation-not-allowed':
            errMsg = '無効のユーザーアカウントです。'
            break
          case 'auth/weak-password':
            errMsg = 'パスワードは6文字以上で入力してください。'
            break
          case 'auth/user-disabled':
            errMsg = '無効のユーザーアカウントです。'
            break
          case 'auth/user-not-found':
            errMsg = 'ユーザーが見つかりませんでした。'
            break
          case 'auth/wrong-password':
            errMsg = '認証情報が一致しません。'
            break
          case 'auth/user-mismatch':
            errMsg = '認証情報が一致しません。'
            break
          default:
            errMsg = '処理に失敗しました。時間をおいて再度お試しください。'
            break
        }
      }
      return errMsg
    }
  }
}
</script>

<style lang="scss" scoped>
.err-msg {
  color: red;
}
</style>
