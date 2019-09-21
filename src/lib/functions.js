import firebase from 'firebase'

export const reAuth = async (currentUser, currentEmail, currentPass) => {
  // 再認証処理
  const credential = await firebase.auth.EmailAuthProvider.credential(
    currentEmail,
    currentPass
  )
  return await currentUser.reauthenticateWithCredential(credential)
}

// 例文データの取得。見つからない場合はfalseを返す。
export const getSentenceById = id => {
  return new Promise((resolve, reject) => {
    const sentenceRef = firebase.firestore().collection('sentences').doc(id)

    sentenceRef.get().then(doc => {
      resolve(Object.assign(doc.data(), { id: doc.id }) || false)
    }).catch(err => {
      reject(err)
    })
  })
}

// 指定したユーザーの例文一覧を取得する
export const fetchUserSentences = async (itemNumber, userId, lastItem) => {

  let query
  if(lastItem) {
    query = firebase.firestore().collection('sentences')
      .where('userId', '==', userId)
      .startAfter(lastItem)
      .limit(itemNumber)
  } else {
    query = firebase.firestore().collection('sentences')
      .where('userId', '==', userId)
      .limit(itemNumber)
  }

  // firestoreからデータを取得
  const snapshot = await query.get()

  return {
    items: snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })), // ドキュメントIDもデータに含める
    lastItem: snapshot.docs[snapshot.docs.length - 1]
  }
}

// リストデータの取得。見つからない場合はfalseを返す。
export const fetchListById = id => {
  return new Promise((resolve, reject) => {
    const listRef = firebase.firestore().collection('lists').doc(id)

    listRef.get().then(doc => {
      resolve(Object.assign(doc.data(), { id: doc.id }) || false)
    }).catch(err => {
      reject(err)
    })
  })
}
