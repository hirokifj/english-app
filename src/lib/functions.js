import firebase from 'firebase'

export const reAuth = async (currentUser, currentEmail, currentPass) => {
  // 再認証処理
  const credential = await firebase.auth.EmailAuthProvider.credential(
    currentEmail,
    currentPass
  )
  return await currentUser.reauthenticateWithCredential(credential)
}
