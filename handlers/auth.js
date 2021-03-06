import firebase from 'firebase'
import store from '../store'
// import { saveUser } from '../lib/actions/user'
import config from '../database/config.json'

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

export const loginWithFacebook = async () => {
   return Expo.Facebook.logInWithReadPermissionsAsync(
      '139659809933718',
      { permissions: ['public_profile'] }
    ).then((
       ({type, token} ) => {
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      return firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
      });
    } else {
      throw new Error()
    }
  }))
}

export const logout = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('logout success')
  }, (error) => {
    // An error happened.
    console.log('logout fail', error)
  });
}

export const signInWithGoogleAsync = async() => {
    try {
      const { type, user } = await Expo.Google.logInAsync({
        androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(accessToken)
        return firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
          console.log('firebaseloginWithGoogle error', error)
        });
      } else {
        throw new Error();
      }
    } catch(e) {
      console.log('loginWithGoogle error', e);
    }

}

export const saveUserNotificationKey = async (userUid, notificationKey) => {
  firebase.database().ref(`/users/${userUid}/notificationKey`).set(notificationKey)
}