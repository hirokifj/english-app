import firebase from 'firebase'
import store from '../store/'

export const reAuth = async (currentUser, currentEmail, currentPass) => {
  // 再認証処理
  const credential = await firebase.auth.EmailAuthProvider.credential(
    currentEmail,
    currentPass
  )
  return await currentUser.reauthenticateWithCredential(credential)
}

// 例文データの取得。見つからない場合はfalseを返す。
export const fetchSentenceById = id => {
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

// リストの一覧を取得する。
const fetchLists = async query => {
  // firestoreからデータを取得
  const snapshot = await query.get()

  return {
    items: snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })), // ドキュメントIDもデータに含める
    lastItem: snapshot.docs[snapshot.docs.length - 1]
  }
}

// 指定したユーザーのリストの一覧を取得する。
export const fetchUserLists = async (itemNumber, userId, lastItem) => {
  // 取得条件を定義
  let query = firebase.firestore().collection('lists').where('userId', '==', userId)
  if(lastItem) {
    query = query.startAfter(lastItem).limit(itemNumber)
  } else {
    query = query.limit(itemNumber)
  }

  return await fetchLists(query)
}

// 公開されているリストの一覧を取得する。
export const fetchPublicLists = async (itemNumber, lastItem) => {
  // 取得条件を定義
  let query = firebase.firestore().collection('lists').where('isPublic', '==', true)
  if(lastItem) {
    query = query.startAfter(lastItem).limit(itemNumber)
  } else {
    query = query.limit(itemNumber)
  }

  return await fetchLists(query)
}

// リスト登録のバリデーション。バリデーションOKならtrueを返す。
export const validateList = (title, publicFlg) => {
  // タイトル入力チェック
  if(title === '') {
    // Firebase標準のエラー情報に合わせたオブジェクトをstoreに渡す
    store.dispatch('error/setError', {
      code: 'required-title-field',
      message: 'title field is required'
    })
    return false
  }
  // 公開フラグチェック
  if(typeof publicFlg !== 'boolean') {
    store.dispatch('error/setError', {
      code: 'invalid-public-field',
      message: 'public field is not boolean'
    })
    return false
  }

  return true
}
