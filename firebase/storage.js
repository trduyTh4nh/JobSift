
import storage from '@react-native-firebase/storage'
export const uploadFile = async (uri, callback, name) => {
  const date = new Date()
  const ref = storage().ref(date + name)
  const task = ref.putFile(uri)
  task.on('state_changed', callback)
  return task
}

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAzsI8rd3A6OOi1Z4OTS-cRlbad11dfg4o",
  authDomain: "jobsift-31641.firebaseapp.com",
  projectId: "jobsift-31641",
  storageBucket: "jobsift-31641.appspot.com",
  messagingSenderId: "125836772411",
  appId: "1:125836772411:web:9026b365eb1001ab2a881e"
};

const app = initializeApp(firebaseConfig);



